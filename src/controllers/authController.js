import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database/mongo.js';

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const userExists = await db.collection('users').findOne({ email });
    if (userExists) return res.status(409).send('Email já cadastrado.');

    const passwordHash = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({ name, email, password: passwordHash });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(404).send('Usuário não encontrado.');

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(401).send('Senha incorreta.');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

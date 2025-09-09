import db from '../database/mongo.js';
import { ObjectId } from 'mongodb';

export async function createTransaction(req, res) {
  const { value, description, type } = req.body;
  const userId = res.locals.userId;

  try {
    await db.collection('transactions').insertOne({
      userId,
      value,
      description,
      type,
      date: new Date()
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getTransactions(req, res) {
  const userId = res.locals.userId;
  const page = parseInt(req.query.page) || 1;
  if (page < 1) return res.status(400).send('Página inválida');

  try {
    const transactions = await db.collection('transactions')
      .find({ userId })
      .sort({ date: -1 })
      .toArray();
    res.send(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function updateTransaction(req, res) {
  const { id } = req.params;
  const { value, description, type } = req.body;
  const userId = res.locals.userId;

  try {
    const transaction = await db.collection('transactions').findOne({ _id: new ObjectId(id) });
if (!transaction || transaction.userId.toString() !== userId.toString()) return res.sendStatus(401);

    await db.collection('transactions').updateOne(
      { _id: new ObjectId(id) },
      { $set: { value, description, type } }
    );

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


export async function deleteTransaction(req, res) {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const transaction = await db.collection('transactions').findOne({ _id: new ObjectId(id) });
    if (!transaction || transaction.userId !== userId) return res.sendStatus(401);

    await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

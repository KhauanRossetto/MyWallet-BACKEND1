import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.userId = decoded.userId;
    next();
  } catch {
    res.sendStatus(401);
  }
}

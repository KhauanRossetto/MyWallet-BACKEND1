import jwt from "jsonwebtoken";

// rotas que NÃO exigem token:
const PUBLIC_PATHS = new Set(["/health", "/signup", "/signin"]);

export default function authMiddleware(req, res, next) {
  // libera preflight do CORS e rotas públicas
  if (req.method === "OPTIONS" || PUBLIC_PATHS.has(req.path)) {
    return next();
  }

  const auth = req.headers.authorization || "";
  const [scheme, token] = auth.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET);
    res.locals.userId = decoded.userId;
    return next();
  } catch {
    return res.sendStatus(401);
  }
}

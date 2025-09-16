// src/app.js
import express from "express";
import cors from "cors";

import authRouter from "./routers/authRouter.js";            // /signup e /signin (públicas)
import authMiddleware from "./middlewares/authMiddleware.js"; // protege o resto
import transactionRouter from "./routers/transactionRouter.js";

const app = express();

app.use(cors({
  origin: ["https://marcielrossetto.github.io", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// --- públicas ---
app.get("/health", (_req, res) => res.send("ok"));
app.use(authRouter); // precisa expor POST /signup e POST /signin

// --- protegidas ---
app.use(authMiddleware);
app.get("/me", (req, res) => res.send({ userId: res.locals.userId }));
app.use("/transactions", transactionRouter);

export default app;

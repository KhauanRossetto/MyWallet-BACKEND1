import { Router } from 'express';
import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';
import validateSchema from '../middlewares/validateSchema.js';
import transactionSchema from '../schemas/transactionSchema.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.post('/transactions', validateSchema(transactionSchema), createTransaction);
router.get('/transactions', getTransactions);
router.put('/transactions/:id', validateSchema(transactionSchema), updateTransaction);
router.delete('/transactions/:id', deleteTransaction);

export default router;

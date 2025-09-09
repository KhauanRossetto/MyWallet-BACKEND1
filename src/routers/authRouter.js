import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import validateSchema from '../middlewares/validateSchema.js';
import signUpSchema from '../schemas/signUpSchema.js';
import signInSchema from '../schemas/signInSchema.js';

const router = Router();

router.post('/sign-up', validateSchema(signUpSchema), signUp);
router.post('/sign-in', validateSchema(signInSchema), signIn);

export default router;

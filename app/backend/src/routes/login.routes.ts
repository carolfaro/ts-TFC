import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import loginValidationMiddleware from '../middleware/login.Validation.Middleware';

const router = Router();

router.post('/login', loginValidationMiddleware.authLogin, AuthController.authLogin);

export default router;

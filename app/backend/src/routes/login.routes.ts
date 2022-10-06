import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import LoginValidationMiddleware from '../middleware/login.Validation.Middleware';

const router = Router();

router.post('/login', LoginValidationMiddleware.verifyEmptyFields, AuthController.authLogin);
router.get('/login/validate', LoginValidationMiddleware.validateEmailPassword);

export default router;

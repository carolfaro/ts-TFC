import { Router } from 'express';
import AuthController from '';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.authLogin);

export default router;

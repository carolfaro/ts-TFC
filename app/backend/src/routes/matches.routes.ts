import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import LoginValidationMiddleware from '../middleware/login.Validation.Middleware';

const router = Router();

router.post(
  '/matches',
  LoginValidationMiddleware.validateToken,
  MatchesController.addMatch,
).get(
  '/matches',
  MatchesController.getAllMatchesOrByProgress,
).patch('/matches/:id/finish', MatchesController.updateStatusMatch);

export default router;

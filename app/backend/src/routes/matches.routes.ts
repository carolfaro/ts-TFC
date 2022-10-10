import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import LoginValidationMiddleware from '../middleware/login.Validation.Middleware';
// import NewMatchValidation from '../middleware/new.match.validation.middleware';

const router = Router();

router.post(
  '/matches',
  LoginValidationMiddleware.validateToken,
  MatchesController.addMatch,
).get(
  '/matches',
  MatchesController.getAllMatchesOrByProgress,
);

export default router;

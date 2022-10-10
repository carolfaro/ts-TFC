import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import LoginValidationMiddleware from '../middleware/login.Validation.Middleware';
import NewMatchValidation from '../middleware/new.match.validation.middleware';

const router = Router();

router.post(
  '/matches',
  LoginValidationMiddleware.validateToken,
  NewMatchValidation.newMatchValidation,
  NewMatchValidation.validationExistingTeam,
  MatchesController.addMatch,
).get(
  '/matches',
  MatchesController.getAllMatchesOrByProgress,
).patch('/matches/:id/finish', MatchesController.updateStatusMatch);

export default router;

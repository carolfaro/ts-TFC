import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import LoginValidationMiddleware from '../middleware/login.Validation.Middleware';
import NewMatchValidation from '../middleware/new.match.validation.middleware';

const router = Router();

router
  .patch('/matches/:id', MatchesController.updateMatchInProgress)
  . patch('/matches/:id/finish', MatchesController.updateStatusMatch)
  . post(
    '/matches',
    LoginValidationMiddleware.validateToken,
    NewMatchValidation.newMatchValidation,
    NewMatchValidation.validationExistingTeam,
    MatchesController.addMatch,
  ).get(
    '/matches',
    MatchesController.getAllMatchesOrByProgress,
  );

export default router;

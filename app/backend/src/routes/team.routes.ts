import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

router.get('/teams', TeamController.getAllTeams);
router.get('/teams/:id', TeamController.getOneTeam);

export default router;

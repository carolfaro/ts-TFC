import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

router.get('/teams', TeamController.getAllTeams);

export default router;

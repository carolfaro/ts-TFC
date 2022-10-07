import { Request, Response } from 'express';
import TeamService from '../services/team.service';

class AuthController {
  static async getAllTeams(req: Request, res: Response) : Promise<Response> {
    const allTeams = await TeamService.getAllTeams();

    return res.status(200).json(allTeams);
  }
}

export default AuthController;

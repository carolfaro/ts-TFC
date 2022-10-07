import { Request, Response } from 'express';
import TeamService from '../services/team.service';

class AuthController {
  static async getAllTeams(req: Request, res: Response) : Promise<Response> {
    const allTeams = await TeamService.getAllTeams();

    return res.status(200).json(allTeams);
  }

  static async getOneTeam(req: Request, res: Response) : Promise<Response> {
    const { id } = req.params;
    const oneTeam = await TeamService.getOneTeam(+id);

    return res.status(200).json(oneTeam);
  }
}

export default AuthController;

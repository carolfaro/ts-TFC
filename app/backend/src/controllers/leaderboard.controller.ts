import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async home(req: Request, res: Response) : Promise<Response> {
    const leaderBoardFinish = await LeaderboardService.home();
    return res.send(leaderBoardFinish);
  }
}

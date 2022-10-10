import { Request, Response } from 'express';
import MatchesService from '../services/match.service';

class MatchesController {
  static async getAllMatchesOrByProgress(req: Request, res: Response) : Promise<Response> {
    const { inProgress } = req.query;
    if (!inProgress || (inProgress !== 'true' && inProgress !== 'false')) {
      const allMatches = await MatchesService.getAllMatches();
      return res.status(200).json(allMatches);
    }
    const query = inProgress === 'true';
    const matchByProgress = await MatchesService.getMatchesByProgress(query);
    return res.status(201).json(matchByProgress);
  }

  static async addMatch(req: Request, res: Response) : Promise<Response> {
    const newMatch = await MatchesService
      .addMatch(req.body);
    return res.status(201).json(newMatch);
  }
}

export default MatchesController;

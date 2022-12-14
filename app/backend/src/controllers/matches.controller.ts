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

  static async updateStatusMatch(req: Request, res: Response) : Promise<Response> {
    const { id } = req.params;
    const changeStatus = await MatchesService.updateStatusMatch(id);
    if (changeStatus === 1) {
      return res.status(200).json('Finished');
    }
    return res.status(500).json('deu ruim');
  }

  static async updateMatchInProgress(req: Request, res: Response) : Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatchesService.updateMatchInProgress(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json('opa');
  }
}

export default MatchesController;

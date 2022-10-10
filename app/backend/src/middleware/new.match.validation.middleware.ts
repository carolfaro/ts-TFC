import { Request, Response, NextFunction } from 'express';
import Team from '../database/models/Team';
import HttpException from '../shared/http.exception';

export default class NewMathValidation {
  static async matchValidation(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    if (!homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals) {
      throw new HttpException(400, 'All fields must be filled');
    }
    const home = await Team.findByPk(homeTeam);
    const away = await Team.findByPk(awayTeam);
    if (!home || !away) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    next();
  }
}

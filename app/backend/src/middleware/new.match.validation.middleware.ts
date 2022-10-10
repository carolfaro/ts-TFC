import { Request, Response, NextFunction } from 'express';
import Team from '../database/models/Team';
import HttpException from '../shared/http.exception';

export default class NewMathValidation {
  // static async matchValidation(req: Request, res: Response, next: NextFunction) {
  //   const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
  //   if (!homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals) {
  //     throw new HttpException(400, 'All fields must be filled');
  //   }
  //   const home = await Team.findByPk(homeTeam);
  //   const away = await Team.findByPk(awayTeam);
  //   if (!home || !away) {
  //     throw new HttpException(404, 'There is no team with such id!');
  //   }

  //   next();
  // }

  static async newMatchValidation(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      throw new HttpException(401, 'It is not possible to create a match with two equal teams');
    }

    next();
  }

  static async validationExistingTeam(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    const findHomeTeam = await Team.findByPk(homeTeam);
    const findAwayTeam = await Team.findByPk(awayTeam);
    if (!findAwayTeam || !findHomeTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    next();
  }
}

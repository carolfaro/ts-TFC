import Matches from '../database/models/Matches';
import IMatches from '../entities/IMatches';
import Team from '../database/models/Team';

class MatchesService {
  static async getAllMatches(): Promise<IMatches[]> {
    const allTeams = await Matches.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return allTeams as IMatches[];
  }

  static async getMatchesByProgress(inProgress: boolean): Promise<IMatches[]> {
    const teamsByProgress = await Matches.findAll({
      where: { inProgress },
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return teamsByProgress as IMatches[];
  }
}

export default MatchesService;

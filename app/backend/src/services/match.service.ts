import Match from '../database/models/Matches';
// import IMatches from '../entities/IMatches';
import Team from '../database/models/Team';
import INewMatches from '../entities/INewMatches';
import HttpException from '../shared/http.exception';

class MatchesService {
  static async getAllMatches(): Promise<Match[]> {
    const allTeams = await Match.findAll({
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
    return allTeams;
  }

  static async getMatchesByProgress(progress: boolean): Promise<Match[]> {
    const teamsByProgress: Match[] = await Match.findAll({
      where: { inProgress: progress },
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

    if (!teamsByProgress) {
      throw new HttpException(500, 'errou');
    }
    return teamsByProgress;
  }

  static async addMatch(matches: INewMatches): Promise<Match> {
    const newMatch = await Match.create({ ...matches, inProgress: true });
    if (!newMatch) {
      throw new HttpException(500, 'errou');
    }
    return newMatch as Match;
  }
}

export default MatchesService;

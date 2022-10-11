import * as sequelize from 'sequelize';
import Match from '../database/models/Matches';
import Team from '../database/models/Team';
import ILeaderBoardFinish from '../entities/ILeaderBoardFinish';

const sum = `SUM(home_team_goals > away_team_goals) * 3 
+ SUM(home_team_goals = away_team_goals)`;
const efficiencyHome = `CONVERT(((SUM(home_team_goals > away_team_goals) * 3) 
+ SUM(home_team_goals = away_team_goals)) / (COUNT(home_team) * 3) * 100, DECIMAL(10,2))`;

export default class LeaderboardService {
  static async homeGetLeaderBoard(): Promise<ILeaderBoardFinish[]> {
    const leaderboardHome = await Match.findAll({ where: { inProgress: false },
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('home_team')), 'totalGames'],
        [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsFavor'],
        [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
        [sequelize.literal('SUM(home_team_goals) - SUM(away_team_goals)'), 'goalsBalance'],
        [sequelize.literal('SUM(home_team_goals > away_team_goals)'), 'totalVictories'],
        [sequelize.literal('SUM(home_team_goals = away_team_goals)'), 'totalDraws'],
        [sequelize.literal('SUM(home_team_goals < away_team_goals)'), 'totalLosses'],
        [sequelize.literal(`${sum}`), 'totalPoints'],
        [sequelize.literal(`${efficiencyHome}`), 'efficiency']],
      include: [{ model: Team, as: 'teamHome', attributes: ['teamName'] }],
      group: ['home_team'],
      order: [
        [sequelize.literal('totalPoints'), 'DESC'], [sequelize.literal('totalVictories'), 'DESC'],
        [sequelize.literal('goalsBalance'), 'DESC'], [sequelize.literal('goalsFavor'), 'DESC'],
        [sequelize.literal('goalsOwn'), 'ASC']] });

    return leaderboardHome as unknown as ILeaderBoardFinish[];
  }

  static async home(): Promise<ILeaderBoardFinish[]> {
    const result = await LeaderboardService.homeGetLeaderBoard();

    const homeLeaderboard = result.map((item) => ({
      name: (item.teamHome as ILeaderBoardFinish).teamName,
      totalPoints: (item.dataValues as ILeaderBoardFinish).totalPoints,
      totalGames: (item.dataValues as ILeaderBoardFinish).totalGames,
      totalVictories: (item.dataValues as ILeaderBoardFinish).totalVictories,
      totalDraws: (item.dataValues as ILeaderBoardFinish).totalDraws,
      totalLosses: (item.dataValues as ILeaderBoardFinish).totalLosses,
      goalsFavor: (item.dataValues as ILeaderBoardFinish).goalsFavor,
      goalsOwn: (item.dataValues as ILeaderBoardFinish).goalsOwn,
      goalsBalance: (item.dataValues as ILeaderBoardFinish).goalsBalance,
      efficiency: (item.dataValues as ILeaderBoardFinish).efficiency,
    }));

    return homeLeaderboard as ILeaderBoardFinish[];
  }
}

import Team from '../database/models/Team';
import ITeams from '../entities/ITeams';

class TeamService {
  static async getAllTeams(): Promise<object> {
    const allTeams = await Team.findAll();
    return allTeams;
  }

  static async getOneTeam(id: number): Promise<object> {
    const oneTeam = await Team.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
      raw: true,
    });

    return oneTeam as ITeams;
  }
}

export default TeamService;

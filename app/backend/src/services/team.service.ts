// import HttpException from '../shared/http.exception';
// import ITeams from '../entities/ITeams';
// import IToken from '../entities/IToken';
// import ITokenRole from '../entities/ITokenRole';
import Team from '../database/models/Team';

class TeamService {
  static async getAllTeams(): Promise<object> {
    const allTeams = await Team.findAll();
    return allTeams;
  }
}

export default TeamService;

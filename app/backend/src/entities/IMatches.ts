import ITeams from './ITeams';

interface IMatches {
  id?: number | string,
  homeTeam: number,
  homeTeamGoals:number,
  awayTeam: number,
  awayTeamGoals:number,
  inProgress:boolean,
  teamHome?: ITeams,
  teamAway?: ITeams;

}

export default IMatches;

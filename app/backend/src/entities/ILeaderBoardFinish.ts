interface ILeader {
  name: string;
  teamName?: string;
  totalPoints: number;
  totalGames:number;
  totalVictories: number;
  goalsFavor:number;
  goalsOwn:number;
  goalsBalance:number;
  efficiency:number;
  [props: string]: unknown;

}

export default ILeader;

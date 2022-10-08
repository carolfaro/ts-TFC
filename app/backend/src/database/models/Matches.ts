import { Model, INTEGER, BOOLEAN } from 'sequelize';
import database from '.';
import Team from './Team';

export default class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!:number;
  awayTeam!:number;
  awayTeamGoals!:number;
  inProgress!:boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: INTEGER,
    field: 'home_team_goals',
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team',
  },
  awayTeamGoals: {
    type: INTEGER,
    field: 'away_team_goals',
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: database,
  tableName: 'matches',
  modelName: 'Matches',
  timestamps: false,
});

Matches.belongsTo(Team, { foreignKey: 'home_team', as: 'teams' });
Matches.belongsTo(Team, { foreignKey: 'away_team', as: 'teams' });
Team.hasMany(Matches, { foreignKey: 'id', as: 'matches' });

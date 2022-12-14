import * as express from 'express';
import 'express-async-errors';
import LoginRoutes from './routes/login.routes';
import TeamRoutes from './routes/team.routes';
import MatchesRoutes from './routes/matches.routes';
import LeaderboardRoutes from './routes/leaderboard.home.routes';
import errorMiddleware from './middleware/http.error.middleware';

class App {
  public app: express.Express;
  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(MatchesRoutes);
    this.app.use(LoginRoutes);
    this.app.use(TeamRoutes);
    this.app.use(LeaderboardRoutes);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();

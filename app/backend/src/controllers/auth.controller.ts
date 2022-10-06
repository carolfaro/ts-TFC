import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  static async authLogin(req: Request, res: Response) : Promise<Response> {
    const { email, password } = req.body;
    const token = await AuthService.authLogin(email, password);

    return res.status(200).json(token);
  }
}

export default AuthController;

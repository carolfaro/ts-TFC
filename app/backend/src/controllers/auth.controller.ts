import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
// import IToken from '../entities/IToken';

class AuthController {
  static async authLogin(req: Request, res: Response) : Promise<Response> {
    const { email, password } = req.body;
    const token = await AuthService.authLogin(email, password);

    return res.status(200).json(token);
  }

  static async roleValidation(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const result = await AuthService.roleValidation(authorization as string);
    return res.status(200).json(result);
  }
}

export default AuthController;

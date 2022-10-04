import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import LoginDto from './dto/LoginDto';

export default class AuthController {
  constructor(private authService = new AuthService()) {}

  public async auth(req: Request< unknown, unknown, LoginDto>, res: Response) {
    const token = await this.authService.authentication(req.body);
    res.status(200).json(token);
  }
}

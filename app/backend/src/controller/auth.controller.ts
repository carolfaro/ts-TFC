import { Request, Response } from 'express';
import AuthService from '';
import LoginDto from '';

export default class AuthController {
  constructor(private authService = new AuthService()) {}

    public async auth(req: Request<{}, {}, LoginDto>, res: Response){
        const token = await this.authService.authentication(req.body);
        res.status(200).json(token);
    }

}

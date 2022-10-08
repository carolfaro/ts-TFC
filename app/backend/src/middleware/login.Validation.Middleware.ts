import { Request, Response, NextFunction } from 'express';
import HttpException from '../shared/http.exception';
import User from '../database/models/User';
import IUser from '../entities/IUser';

class LoginValidationMiddleware {
  static async verifyEmptyFields(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      // return res.status(400).json({ message: 'All fields must be filled' });
      throw new HttpException(400, 'All fields must be filled');
    }

    const findUser = await User.findOne({ where: { email } }) as IUser;
    if (!findUser) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    next();
  }

  static async validateEmailPassword(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpException(400, 'Provide a token');
    }

    next();
  }
}

export default LoginValidationMiddleware;

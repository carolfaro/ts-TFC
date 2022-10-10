import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../shared/http.exception';
import User from '../database/models/User';
import IUser from '../entities/IUser';
import ITokenRole from '../entities/ITokenRole';

const errorToken = 'Provide a token';

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
      throw new HttpException(400, errorToken);
    }

    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpException(400, errorToken);
    }

    const token = jwt.verify(authorization, 'jwt_secret') as ITokenRole;
    const { userId } = token;
    const user = await User.findByPk(userId);
    if (!user) {
      throw new HttpException(401, 'Token must be a valid token');
    }

    next();
  }
}

export default LoginValidationMiddleware;

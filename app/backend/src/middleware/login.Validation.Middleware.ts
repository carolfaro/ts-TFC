import { Request, Response, NextFunction } from 'express';
import HttpException from '../shared/http.exception';

class LoginValidationMiddleware {
  static async verifyEmptyFields(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
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

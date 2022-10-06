import { Request, Response, NextFunction } from 'express';
// import HttpException from '../shared/http.exception';

class loginValidationMiddleware {
  static async authLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }
}

export default loginValidationMiddleware;

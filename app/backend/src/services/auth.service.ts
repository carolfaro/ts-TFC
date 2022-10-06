import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import HttpException from '../shared/http.exception';
import UserModel from '../database/models/User';
import IUser from '../entities/IUser';
import IToken from '../entities/IToken';

class AuthService {
  static async authLogin(email: string, password: string): Promise<IToken> {
    const findUser = await UserModel.findOne({ where: { email } }) as IUser;

    if (!findUser) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const comparePassword = bcrypt.compareSync(password, findUser.password);

    if (!comparePassword) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const token: string = jwt.sign({ userId: findUser.id }, 'jwt_secret', { expiresIn: '365d' });

    return { token };
  }
}

export default AuthService;

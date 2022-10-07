import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import HttpException from '../shared/http.exception';
import IUser from '../entities/IUser';
import IToken from '../entities/IToken';
import ITokenRole from '../entities/ITokenRole';
import User from '../database/models/User';

class AuthService {
  static async authLogin(email: string, password: string): Promise<IToken> {
    const findUser = await User.findOne({ where: { email } }) as IUser;

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

  static async roleValidation(authorization: string): Promise<object> {
    const token = jwt.verify(authorization, 'jwt_secret') as ITokenRole;
    const { userId } = token;
    const { role } = await User.findByPk(userId) as IUser;
    return { role };
  }
}

export default AuthService;

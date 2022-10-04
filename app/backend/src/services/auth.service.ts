import HttpException from 'src/shared/http.exception';
import LoginDto from '../controllers/dto/LoginDto';
import TokenGenerate from '';
import sequelize from '../database/models';

export default class AuthService {
  public async authentication(loginDto: LoginDto) {
    if (!loginDto.user || !loginDto.password) {
      throw { status: 401, message: 'Campos faltantes.' };
    }

    const userValidate = await sequelize.models.User.findOne({

    });
  }
}

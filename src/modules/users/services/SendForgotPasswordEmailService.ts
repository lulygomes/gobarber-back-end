import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

// import User from '../infra/typeorm/entities/User';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    try {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
        throw new AppError('User does not exists');
      }

      const { token } = await this.userTokensRepository.generate(user.id);

      await this.mailProvider.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[GoBarber] Recuperação de senha',
        templateData: {
          template: 'Olá, {{name}}: {{token}}',
          variables: {
            name: user.name,
            token,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default SendForgotPasswordEmailService;

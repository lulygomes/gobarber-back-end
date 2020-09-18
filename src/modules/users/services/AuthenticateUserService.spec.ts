import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserServices';
import CreateUserServices from './CreateUserServices';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);
    const createUser = new CreateUserServices(fakeUsersRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'qwerasdf',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@email.com',
      password: 'qwerasdf',
    });

    expect(response).toHaveProperty('token');
  });
});

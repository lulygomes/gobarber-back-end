import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserServices';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'qwerasdf',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'qwerasdf',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'qwerasdf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

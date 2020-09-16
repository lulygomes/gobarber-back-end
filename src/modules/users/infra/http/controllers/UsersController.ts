import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserServices from '@modules/users/services/CreateUserServices';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUser = container.resolve(CreateUserServices);

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      delete user.password;

      return response.status(200).json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

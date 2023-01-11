import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  name?: string;
  password?: string;
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ id, name, password }: IRequest) {
    const user = await this.userRepository.findById(id);

    if (name) {
      user.name = name;
    }

    if (password) {
      const passwordEncrypted = await hash(password, 8);

      user.password = passwordEncrypted;
    }

    await this.userRepository.create(user);
  }
}

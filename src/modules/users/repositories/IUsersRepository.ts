import { User } from "../infra/typeorm/entities/User";
import { ICreateUser } from "../interfaces/ICreateUser";

export interface IUsersRepository {
  create(data: ICreateUser): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

import { ICreateUser } from "@modules/users/interfaces/ICreateUser";
import { UserRepositoryInMemory } from "@modules/users/repositories/in-memory/UserRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Create user", () => {
  userRepositoryInMemory = new UserRepositoryInMemory();
  createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

  it("should be able to create an user", async () => {
    const user: ICreateUser = {
      email: "test@authsystem.com",
      name: "auth system name",
      password: "auth system pass",
    };

    await createUserUseCase.execute(user);
  });

  it("should not be able to create an user with an exisistent email", async () => {
    expect(async () => {
      const user: ICreateUser = {
        email: "test@authsystem.com",
        name: "auth system name",
        password: "auth system pass",
      };

      await createUserUseCase.execute(user);
      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError);
  });
});

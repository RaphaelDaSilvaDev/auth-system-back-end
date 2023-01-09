import { ICreateUser } from "@modules/users/interfaces/ICreateUser";
import { UserRepositoryInMemory } from "@modules/users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { DeleteUserUseCase } from "./deleteUserUseCase";

let userRepository: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let deleteUserUseCase: DeleteUserUseCase;

describe("Delete user", () => {
  userRepository = new UserRepositoryInMemory();
  createUserUseCase = new CreateUserUseCase(userRepository);
  deleteUserUseCase = new DeleteUserUseCase(userRepository);

  it("should be able delete current user", async () => {
    const user: ICreateUser = {
      email: "test@authsystem.com",
      name: "auth system name",
      password: "auth system pass",
    };

    await createUserUseCase.execute(user);

    const newUser = await userRepository.findByEmail("test@authsystem.com");

    await deleteUserUseCase.execute(newUser.id);

    expect(userRepository.users.length).toBe(0);
  });
});

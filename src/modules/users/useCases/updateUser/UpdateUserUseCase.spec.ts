import { UserRepositoryInMemory } from "@modules/users/repositories/in-memory/UserRepositoryInMemory";
import { compare, hash } from "bcrypt";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

let updateUserUseCase: UpdateUserUseCase;
let userRepository: UserRepositoryInMemory;
let createUser: CreateUserUseCase;

describe("Update user", () => {
  userRepository = new UserRepositoryInMemory();
  updateUserUseCase = new UpdateUserUseCase(userRepository);
  createUser = new CreateUserUseCase(userRepository);

  it("should be able update an user name", async () => {
    await createUser.execute({
      email: "jonh@doe.com",
      name: "John Doe",
      password: "1234",
    });

    const getUser = await userRepository.findByEmail("jonh@doe.com");

    await updateUserUseCase.execute({ id: getUser.id, name: "Doe, John" });

    const user = await userRepository.findById(getUser.id);

    expect(user.name).toBe("Doe, John");
  });

  it("should be able update an user password", async () => {
    await createUser.execute({
      email: "jonh@password.com",
      name: "John Doe",
      password: "1234",
    });

    const getUser = await userRepository.findByEmail("jonh@doe.com");

    await updateUserUseCase.execute({ id: getUser.id, password: "4321" });

    const user = await userRepository.findById(getUser.id);

    const passwordMatch = await compare("4321", user.password);

    expect(passwordMatch).toBeTruthy();
  });
});

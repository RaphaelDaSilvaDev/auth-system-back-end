import { AuthenticationUserController } from "@modules/users/useCases/authenticationUser/AuthenticationUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { Router } from "express";

const userRoutes = Router();

const createUserController = new CreateUserController();

const authenticationUserController = new AuthenticationUserController();

userRoutes.post("/", createUserController.handle);

userRoutes.post("/session", authenticationUserController.handle);

export { userRoutes };

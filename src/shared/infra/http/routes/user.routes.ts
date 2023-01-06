import { AuthenticationUserController } from "@modules/users/useCases/authenticationUser/AuthenticationUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticationUserController = new AuthenticationUserController();
const updateUserController = new UpdateUserController();

userRoutes.post("/", createUserController.handle);

userRoutes.post("/session", authenticationUserController.handle);

userRoutes.patch("/update", ensureAuthenticated, updateUserController.handle);

export { userRoutes };
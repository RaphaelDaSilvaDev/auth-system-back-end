import { AuthenticationUserController } from "@modules/users/useCases/authenticationUser/AuthenticationUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/deleteUserController";
import { ListUserController } from "@modules/users/useCases/listUser/ListUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticationUserController = new AuthenticationUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const listUserController = new ListUserController();

userRoutes.post("/", createUserController.handle);

userRoutes.post("/session", authenticationUserController.handle);

userRoutes.patch("/update", ensureAuthenticated, updateUserController.handle);

userRoutes.delete("/delete", ensureAuthenticated, deleteUserController.handle);

userRoutes.get("/", ensureAuthenticated, ensureIsAdmin, listUserController.handle);

export { userRoutes };

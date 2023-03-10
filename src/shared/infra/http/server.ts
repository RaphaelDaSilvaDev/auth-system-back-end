import "reflect-metadata";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";

import { router } from "./routes";

import "../../containers";
import createConnection from "../typeorm";
import { AppError } from "@shared/errors/AppError";

createConnection();
const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response
    .status(500)
    .json({ status: "error", message: `Internal server error - ${error.message}` });
});

app.listen(3333, () => console.log("Server is Running!"));

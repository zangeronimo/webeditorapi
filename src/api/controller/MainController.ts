import { Router } from "express";
import { AuthController } from "./webeditor/AuthController";
import { UserController } from "./webeditor/UserController";
import { EnsureAuthenticated } from "@api/midleware/EnsureAuthenticated";

export class MainController {
  authController = new AuthController();
  userController = new UserController();
  ensureAuthenticated = new EnsureAuthenticated();
  router = Router();

  constructor() {
    this.router.post("/auth", this.authController.Login);

    this.router.get(
      "/user",
      this.ensureAuthenticated.Execute,
      this.userController.GetAll
    );
    this.router.get(
      "/user/:id",
      this.ensureAuthenticated.Execute,
      this.userController.GetById
    );
    this.router.post(
      "/user",
      this.ensureAuthenticated.Execute,
      this.userController.Create
    );
    this.router.put(
      "/user/:id",
      this.ensureAuthenticated.Execute,
      this.userController.Update
    );
    this.router.delete(
      "/user/:id",
      this.ensureAuthenticated.Execute,
      this.userController.Delete
    );
  }
}

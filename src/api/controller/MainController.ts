import { Router } from "express";
import { AuthController } from "./webeditor/AuthController";
import { UserController } from "./webeditor/UserController";
import { EnsureAuthenticated } from "@api/midleware/EnsureAuthenticated";
import { RoleController } from "./webeditor/RoleController";

export class MainController {
  authController = new AuthController();
  userController = new UserController();
  roleController = new RoleController();
  ensureAuthenticated = new EnsureAuthenticated();
  router = Router();

  constructor() {
    this.router.post("/auth", this.authController.Login);

    this.router.get(
      "/role",
      this.ensureAuthenticated.Execute,
      this.roleController.GetAll
    );
    this.router.get(
      "/role/:id",
      this.ensureAuthenticated.Execute,
      this.roleController.GetById
    );
    this.router.post(
      "/role",
      this.ensureAuthenticated.Execute,
      this.roleController.Create
    );
    this.router.put(
      "/role/:id",
      this.ensureAuthenticated.Execute,
      this.roleController.Update
    );
    this.router.delete(
      "/role/:id",
      this.ensureAuthenticated.Execute,
      this.roleController.Delete
    );

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

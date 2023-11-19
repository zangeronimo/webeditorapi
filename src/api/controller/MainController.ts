import { Router } from "express";
import { AuthController } from "./webeditor/AuthController";
import { UserController } from "./webeditor/UserController";
import { EnsureAuthenticated } from "@api/midleware/EnsureAuthenticated";
import { RoleController } from "./webeditor/RoleController";
import { EnsureHasRole } from "@api/midleware/EnsureHasRole";

export class MainController {
  authController = new AuthController();
  userController = new UserController();
  roleController = new RoleController();
  ensureAuthenticated = new EnsureAuthenticated();
  ensureHasRole = new EnsureHasRole();
  router = Router();

  constructor() {
    this.router.post("/auth", this.authController.Login);

    this.router.get(
      "/role",
      this.ensureAuthenticated.Execute,
      this.ensureHasRole.Execute("WEBEDITOR_ROLE_VIEW"),
      this.roleController.GetAll
    );
    this.router.get(
      "/role/:id",
      this.ensureAuthenticated.Execute,
      this.ensureHasRole.Execute("WEBEDITOR_ROLE_VIEW"),
      this.roleController.GetById
    );
    this.router.post(
      "/role",
      this.ensureAuthenticated.Execute,
      this.ensureHasRole.Execute("WEBEDITOR_ROLE_UPDATE"),
      this.roleController.Create
    );
    this.router.put(
      "/role/:id",
      this.ensureAuthenticated.Execute,
      this.ensureHasRole.Execute("WEBEDITOR_ROLE_UPDATE"),
      this.roleController.Update
    );
    this.router.delete(
      "/role/:id",
      this.ensureAuthenticated.Execute,
      this.ensureHasRole.Execute("WEBEDITOR_ROLE_DELETE"),
      this.roleController.Delete
    );

    this.router.get(
      "/user",
      this.ensureAuthenticated.Execute,
      this.ensureHasRole.Execute("WEBEDITOR_USER_VIEW"),
      this.userController.GetAll
    );
    this.router.get(
      "/user/:id",
      this.ensureAuthenticated.Execute,
      this.ensureHasRole.Execute("WEBEDITOR_USER_VIEW"),
      this.userController.GetById
    );
    this.router.post(
      "/user",
      this.ensureAuthenticated.Execute,
      this.ensureHasRole.Execute("WEBEDITOR_USER_UPDATE"),
      this.userController.Create
    );
    this.router.put(
      "/user/:id",
      this.ensureAuthenticated.Execute,
      this.ensureHasRole.Execute("WEBEDITOR_USER_UPDATE"),
      this.userController.Update
    );
    this.router.delete(
      "/user/:id",
      this.ensureAuthenticated.Execute,
      this.ensureHasRole.Execute("WEBEDITOR_USER_DELETE"),
      this.userController.Delete
    );
  }
}

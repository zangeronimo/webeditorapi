import { Router } from "express";
import { AuthController } from "./webeditor/AuthController";
import { UserController } from "./webeditor/UserController";
import { EnsureAuthenticated } from "@api/midleware/EnsureAuthenticated";
import { RoleController } from "./webeditor/RoleController";
import { EnsureHasRole } from "@api/midleware/EnsureHasRole";

export class MainController {
  ensureAuthenticated = new EnsureAuthenticated();
  ensureHasRole = new EnsureHasRole();
  authController = new AuthController();
  userController = new UserController(
    this.ensureAuthenticated,
    this.ensureHasRole
  );
  roleController = new RoleController(
    this.ensureAuthenticated,
    this.ensureHasRole
  );
  router = Router();

  constructor() {
    this.router.use("/auth", this.authController.router);
    this.router.use("/role", this.roleController.router);
    this.router.use("/user", this.userController.router);
  }
}

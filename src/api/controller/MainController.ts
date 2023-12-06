import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import { Router } from "express";
import { AuthController } from "./webeditor/AuthController";
import { CompanyController } from "./webeditor/CompanyController";
import { ModuleController } from "./webeditor/ModuleController";
import { RoleController } from "./webeditor/RoleController";
import { UserController } from "./webeditor/UserController";

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
  companyController = new CompanyController(
    this.ensureAuthenticated,
    this.ensureHasRole
  );
  moduleController = new ModuleController(
    this.ensureAuthenticated,
    this.ensureHasRole
  );
  router = Router();

  constructor() {
    this.router.use("/auth", this.authController.router);
    this.router.use("/company", this.companyController.router);
    this.router.use("/module", this.moduleController.router);
    this.router.use("/role", this.roleController.router);
    this.router.use("/user", this.userController.router);
  }
}

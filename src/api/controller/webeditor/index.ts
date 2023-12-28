import { AuthController } from "./AuthController";
import { CompanyController } from "./CompanyController";
import { ModuleController } from "./ModuleController";
import { RoleController } from "./RoleController";
import { UserController } from "./UserController";
import { Router } from "express";

export class WEBEditorRouters {
  static init = (
    router: Router
  ) => {
    const authController = new AuthController();
    const userController = new UserController();
    const roleController = new RoleController();
    const companyController = new CompanyController();
    const moduleController = new ModuleController();

    router.use("/auth", authController.router);
    router.use("/company", companyController.router);
    router.use("/module", moduleController.router);
    router.use("/role", roleController.router);
    router.use("/user", userController.router);
  };
}

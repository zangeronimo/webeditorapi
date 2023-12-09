import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import { AuthController } from "./AuthController";
import { CompanyController } from "./CompanyController";
import { ModuleController } from "./ModuleController";
import { RoleController } from "./RoleController";
import { UserController } from "./UserController";
import { Router } from "express";

export class WEBEditorRouters {
  static init = (
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole,
    router: Router
  ) => {
    const authController = new AuthController();
    const userController = new UserController(
      ensureAuthenticated,
      ensureHasRole
    );
    const roleController = new RoleController(
      ensureAuthenticated,
      ensureHasRole
    );
    const companyController = new CompanyController(
      ensureAuthenticated,
      ensureHasRole
    );
    const moduleController = new ModuleController(
      ensureAuthenticated,
      ensureHasRole
    );

    router.use("/auth", authController.router);
    router.use("/company", companyController.router);
    router.use("/module", moduleController.router);
    router.use("/role", roleController.router);
    router.use("/user", userController.router);
  };
}

import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import { Router } from "express";
import { ClientController } from "./ClientController";
import { ProjectController } from "./ProjectController";

export class TimeSheetRouters {
  static init = (
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole,
    router: Router
  ) => {
    const clientController = new ClientController(
      ensureAuthenticated,
      ensureHasRole
    );
    const projectController = new ProjectController(
      ensureAuthenticated,
      ensureHasRole
    );

    router.use("/timesheet/client", clientController.router);
    router.use("/timesheet/project", projectController.router);
  };
}

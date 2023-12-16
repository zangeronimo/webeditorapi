import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import { Router } from "express";
import { ClientController } from "./ClientController";
import { EpicController } from "./EpicController";
import { PbiController } from "./PbiController";
import { ProjectController } from "./ProjectController";
import { PbiStatusController } from "./PbiStatusController";

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
    const epicController = new EpicController(
      ensureAuthenticated,
      ensureHasRole
    );
    const pbiController = new PbiController(ensureAuthenticated, ensureHasRole);
    const pbiStatusController = new PbiStatusController(
      ensureAuthenticated,
      ensureHasRole
    );

    router.use("/timesheet/client", clientController.router);
    router.use("/timesheet/epic", epicController.router);
    router.use("/timesheet/pbi", pbiController.router);
    router.use("/timesheet/pbiStatus", pbiStatusController.router);
    router.use("/timesheet/project", projectController.router);
  };
}

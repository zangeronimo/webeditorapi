import { Router } from "express";
import { ClientController } from "./ClientController";
import { EpicController } from "./EpicController";
import { PbiController } from "./PbiController";
import { ProjectController } from "./ProjectController";
import { PbiStatusController } from "./PbiStatusController";

export class TimeSheetRouters {
  static init = (
    router: Router
  ) => {
    const clientController = new ClientController();
    const projectController = new ProjectController();
    const epicController = new EpicController();
    const pbiController = new PbiController();
    const pbiStatusController = new PbiStatusController();

    router.use("/timesheet/client", clientController.router);
    router.use("/timesheet/epic", epicController.router);
    router.use("/timesheet/pbi", pbiController.router);
    router.use("/timesheet/pbiStatus", pbiStatusController.router);
    router.use("/timesheet/project", projectController.router);
  };
}

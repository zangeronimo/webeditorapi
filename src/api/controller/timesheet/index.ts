import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import { ClientController } from "./ClientController";
import { Router } from "express";

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

    router.use("/timesheet/client", clientController.router);
  };
}

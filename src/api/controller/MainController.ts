import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import { Router } from "express";
import { WEBEditorRouters } from "./webeditor";
import { TimeSheetRouters } from "./timesheet";

export class MainController {
  ensureAuthenticated = new EnsureAuthenticated();
  ensureHasRole = new EnsureHasRole();
  router = Router();

  constructor() {
    WEBEditorRouters.init(
      this.ensureAuthenticated,
      this.ensureHasRole,
      this.router
    );
    TimeSheetRouters.init(
      this.ensureAuthenticated,
      this.ensureHasRole,
      this.router
    );
  }
}

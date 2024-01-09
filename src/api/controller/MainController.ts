import { Router } from "express";
import { CulinaryRouters } from "./culinary";
import { InstitutionalRouters } from "./institutional";
import { TimeSheetRouters } from "./timesheet";
import { WEBEditorRouters } from "./webeditor";

export class MainController {
  router = Router();

  constructor() {
    WEBEditorRouters.init(this.router);
    TimeSheetRouters.init(this.router);
    CulinaryRouters.init(this.router);
    InstitutionalRouters.init(this.router);
  }
}

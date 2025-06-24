import { Router } from "express";
import { CulinaryRouters } from "./culinary";
import { InstitutionalRouters } from "./institutional";
import { TimeSheetRouters } from "./timesheet";
import { WEBEditorRouters } from "./webeditor";
import { WebCulinaryRouters } from "./web/culinary";

export class MainController {
  router = Router();

  constructor() {
    WEBEditorRouters.init(this.router);
    TimeSheetRouters.init(this.router);
    CulinaryRouters.init(this.router);
    InstitutionalRouters.init(this.router);
    WebCulinaryRouters.init(this.router);
  }
}

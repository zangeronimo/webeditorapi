import { Authorize } from "@web/webeditor/authorize";
import { Pug } from "@web/webeditor/models/Pug";
import { Dashboard } from "@web/webeditor/views/institutional/dashboard";
import { Request, Response, Router } from "express";

export class DashboardRoutes extends Pug {
  router = Router();
  authorize = new Authorize();

  constructor(readonly baseRender: any) {
    super();
    this.router.get("/", this.authorize.isAutenticated, this.show);
  }

  private show = async (req: Request, res: Response) => {
    const { header, sidebar } = await this.baseRender();
    const dashboard = new Dashboard();
    const { root, seo } = await dashboard.render();
    const page = { root, seo, header, sidebar };
    return res.render("template", page);
  };
}

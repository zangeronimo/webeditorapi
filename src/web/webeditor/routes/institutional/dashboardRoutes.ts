import { Request, Response, Router } from "express";
import { Pug } from "web/webeditor/models/Pug";
import { Dashboard } from "web/webeditor/views/dashboard";

export class DashboardRoutes extends Pug {
  router = Router();

  constructor(readonly baseRender: any) {
    super();
    this.router.get("/", this.show);
  }

  private show = async (req: Request, res: Response) => {
    const { header, sidebar } = await this.baseRender();
    const dashboard = new Dashboard();
    const { root, seo } = await dashboard.render();
    const page = { root, seo, header, sidebar };
    return res.render("template", page);
  };
}

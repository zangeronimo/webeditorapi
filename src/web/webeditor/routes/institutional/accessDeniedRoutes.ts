import { Authorize } from "@web/webeditor/authorize";
import { Pug } from "@web/webeditor/models/Pug";
import { AccessDenied } from "@web/webeditor/views/accessDenied";
import { Request, Response, Router } from "express";

export class AccessDeniedRoutes extends Pug {
  router = Router();
  authorize = new Authorize();

  constructor(readonly baseRender: any) {
    super();
    this.router.get("/", this.authorize.isAutenticated, this.show);
  }

  private show = async (req: Request, res: Response) => {
    const { header, sidebar } = await this.baseRender();
    const accessDenied = new AccessDenied();
    const { root, seo } = await accessDenied.render();
    const page = { root, seo, header, sidebar };
    return res.render("template", page);
  };
}

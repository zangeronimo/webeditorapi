import { Request, Response, Router } from "express";
import { Pug } from "web/webeditor/models/Pug";
import { Newsletter } from "web/webeditor/views/newsletter";

export class NewslettersRoutes extends Pug {
  router = Router();

  constructor(readonly baseRender: any) {
    super();
    this.router.get("/", this.show);
  }

  private show = async (req: Request, res: Response) => {
    const { header, sidebar } = await this.baseRender();
    const newsletter = new Newsletter();
    const { root, seo } = await newsletter.render();
    const page = { root, seo, header, sidebar };
    return res.render("template", page);
  };
}

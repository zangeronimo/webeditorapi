import { GetAllNewsletterFilterModel } from "@application/model/institutional/newsletter";
import { Request, Response, Router } from "express";
import { Authorize } from "web/webeditor/Authorize";
import { Pug } from "web/webeditor/models/Pug";
import { Newsletter } from "web/webeditor/views/newsletter";

export class NewslettersRoutes extends Pug {
  router = Router();
  authorize = new Authorize();

  constructor(readonly baseRender: any) {
    super();
    this.router.get("/", this.authorize.isAutenticated, this.show);
  }

  private show = async (req: Request, res: Response) => {
    req.query.page = req.query.page ?? "1";
    req.query.pageSize = req.query.pageSize ?? "20";
    const { header, sidebar } = await this.baseRender();
    const { company } = req.user;
    const newsletter = new Newsletter();
    const model = new GetAllNewsletterFilterModel(req.query);
    const { root, seo } = await newsletter.render(model, company);
    return res.render("template", { root, seo, header, sidebar });
  };
}

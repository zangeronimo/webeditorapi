import { Messages } from "@application/messages/Messages";
import { Roles } from "@application/messages/Roles";
import {
  GetAllNewsletterFilterModel,
  NewsletterUpdateDataModel,
} from "@application/model/institutional/newsletter";
import {
  NewsletterDelete,
  NewsletterGetById,
  NewsletterUpdate,
} from "@application/usecase/institutional/newsletter";
import { Authorize } from "@web/webeditor/authorize";
import { Pug } from "@web/webeditor/models/Pug";
import { Newsletter } from "@web/webeditor/views/institutional/newsletter";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class NewslettersRoutes extends Pug {
  router = Router();
  authorize = new Authorize();
  newsletterGetById = container.resolve(NewsletterGetById);
  newsletterUpdate = container.resolve(NewsletterUpdate);
  newsletterDelete = container.resolve(NewsletterDelete);

  constructor(readonly baseRender: any) {
    super();
    this.router.get(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.institutional.newsletters.view, true),
      this.show
    );
    this.router.get(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.institutional.newsletters.update),
      this.getById
    );
    this.router.put(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.institutional.newsletters.update),
      this.update
    );
    this.router.delete(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.institutional.newsletters.delete),
      this.delete
    );
  }

  private show = async (req: Request, res: Response) => {
    req.query.page = req.query.page ?? "1";
    req.query.pageSize = req.query.pageSize ?? "20";
    req.query.orderBy = req.query.orderBy ?? "active, created_at";
    const { header, sidebar } = await this.baseRender();
    const { company } = req.user;
    const newsletter = new Newsletter();
    const model = new GetAllNewsletterFilterModel(req.query);
    const { root, seo } = await newsletter.render(model, company);
    return res.render("template", { root, seo, header, sidebar });
  };

  private getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const newsletter = await this.newsletterGetById.executeAsync(id, company);
    return res.json(newsletter);
  };

  private update = async (req: Request, res: Response) => {
    const { id: paramId } = req.params;
    const { id, name, email, active } = req.body;
    if (id !== paramId) {
      throw new Error(Messages.invalidId);
    }
    const { company } = req.user;
    const model = new NewsletterUpdateDataModel(id, name, email, active);
    const newsletter = await this.newsletterUpdate.executeAsync(model, company);
    return res.json(newsletter);
  };

  private delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const newsletter = await this.newsletterDelete.executeAsync(id, company);
    return res.json(newsletter);
  };
}

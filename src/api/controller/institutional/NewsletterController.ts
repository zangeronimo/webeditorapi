import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  GetAllNewsletterFilterModel,
  NewsletterCreateDataModel,
  NewsletterUpdateDataModel,
} from "@application/model/institutional/newsletter";
import {
  NewsletterCreate,
  NewsletterDelete,
  NewsletterGetAll,
  NewsletterGetById,
  NewsletterUpdate,
} from "@application/usecase/institutional/newsletter";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class NewsletterController {
  router = Router();
  newsletterGetAll = container.resolve(NewsletterGetAll);
  newsletterGetById = container.resolve(NewsletterGetById);
  newsletterCreate = container.resolve(NewsletterCreate);
  newsletterUpdate = container.resolve(NewsletterUpdate);
  newsletterDelete = container.resolve(NewsletterDelete);
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  ensureHasRole = container.resolve(EnsureHasRole);

  constructor() {
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("INSTITUTIONAL_NEWSLETTER_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("INSTITUTIONAL_NEWSLETTER_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("INSTITUTIONAL_NEWSLETTER_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("INSTITUTIONAL_NEWSLETTER_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("INSTITUTIONAL_NEWSLETTER_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllNewsletterFilterModel = new GetAllNewsletterFilterModel(
        req.query
      );
      const newsletters = await this.newsletterGetAll.executeAsync(
        getAllNewsletterFilterModel,
        company
      );
      return res.json(newsletters);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const newsletter = await this.newsletterGetById.executeAsync(id, company);
      return res.json(newsletter);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, email, active } = req.body;
      const newsletterCreateDataModel = new NewsletterCreateDataModel(
        name,
        email,
        active
      );
      const newsletter = await this.newsletterCreate.executeAsync(
        newsletterCreateDataModel,
        company
      );
      return res.status(201).json(newsletter);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id, name, email, active } = req.body;
      const newsletterUpdateDataModel = new NewsletterUpdateDataModel(
        id,
        email,
        name,
        active
      );
      const newsletter = await this.newsletterUpdate.executeAsync(
        newsletterUpdateDataModel,
        company
      );
      return res.json(newsletter);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const newsletter = await this.newsletterDelete.executeAsync(id, company);
      return res.json(newsletter);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

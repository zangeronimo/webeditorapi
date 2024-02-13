import { Messages } from "@application/messages/Messages";
import { Roles } from "@application/messages/Roles";
import {
  BannerCategoryCreateDataModel,
  BannerCategoryUpdateDataModel,
  GetAllBannersCategoriesFilterModel,
} from "@application/model/publicity/bannerCategory";
import {
  BannerCategoryCreate,
  BannerCategoryDelete,
  BannerCategoryGetById,
  BannerCategoryUpdate,
} from "@application/usecase/publicity/bannerCategory";
import { Authorize } from "@web/webeditor/authorize";
import { Pug } from "@web/webeditor/models/Pug";
import { BannerCategory } from "@web/webeditor/views/publicity/bannerCategory";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class BannersCategoriesRoutes extends Pug {
  router = Router();
  authorize = new Authorize();
  bannerCategoryGetById = container.resolve(BannerCategoryGetById);
  bannerCategoryCreate = container.resolve(BannerCategoryCreate);
  bannerCategoryUpdate = container.resolve(BannerCategoryUpdate);
  bannerCategoryDelete = container.resolve(BannerCategoryDelete);

  constructor(readonly baseRender: any) {
    super();
    this.router.get(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.publicity.categories.view, true),
      this.show
    );
    this.router.get(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.publicity.categories.update),
      this.getById
    );
    this.router.post(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.publicity.categories.update),
      this.create
    );
    this.router.put(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.publicity.categories.update),
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
    const { header, sidebar } = await this.baseRender();
    const { company } = req.user;
    const bannerCategory = new BannerCategory();
    const model = new GetAllBannersCategoriesFilterModel(req.query);
    const { root, seo } = await bannerCategory.render(model, company);
    return res.render("template", { root, seo, header, sidebar });
  };

  private getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const category = await this.bannerCategoryGetById.executeAsync(id, company);
    return res.json(category);
  };

  private create = async (req: Request, res: Response) => {
    const { name, active } = req.body;
    const { company } = req.user;
    const model = new BannerCategoryCreateDataModel(name, active);
    const category = await this.bannerCategoryCreate.executeAsync(
      model,
      company
    );
    return res.json(category);
  };

  private update = async (req: Request, res: Response) => {
    const { id: paramId } = req.params;
    const { id, name, active } = req.body;
    if (id !== paramId) {
      throw new Error(Messages.invalidId);
    }
    const { company } = req.user;
    const model = new BannerCategoryUpdateDataModel(id, name, active);
    const category = await this.bannerCategoryUpdate.executeAsync(
      model,
      company
    );
    return res.json(category);
  };

  private delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const category = await this.bannerCategoryDelete.executeAsync(id, company);
    return res.json(category);
  };
}

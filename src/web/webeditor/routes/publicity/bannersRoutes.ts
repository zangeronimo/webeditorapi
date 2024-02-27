import { Messages } from "@application/messages/Messages";
import { Roles } from "@application/messages/Roles";
import {
  BannerCreateDataModel,
  BannerUpdateDataModel,
  GetAllBannersFilterModel,
} from "@application/model/publicity/banner";
import {
  BannerCreate,
  BannerDelete,
  BannerGetById,
  BannerUpdate,
} from "@application/usecase/publicity/banner";
import { Authorize } from "@web/webeditor/authorize";
import { Pug } from "@web/webeditor/models/Pug";
import { Banner } from "@web/webeditor/views/publicity/banner";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class BannersRoutes extends Pug {
  router = Router();
  authorize = new Authorize();
  bannerGetById = container.resolve(BannerGetById);
  bannerCreate = container.resolve(BannerCreate);
  bannerUpdate = container.resolve(BannerUpdate);
  bannerDelete = container.resolve(BannerDelete);

  constructor(readonly baseRender: any) {
    super();
    this.router.get(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.publicity.banners.view, true),
      this.show
    );
    this.router.get(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.publicity.banners.update),
      this.getById
    );
    this.router.post(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.publicity.banners.update),
      this.create
    );
    this.router.put(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.publicity.banners.update),
      this.update
    );
    this.router.delete(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.publicity.banners.delete),
      this.delete
    );
  }

  private show = async (req: Request, res: Response) => {
    req.query.page = req.query.page ?? "1";
    req.query.pageSize = req.query.pageSize ?? "20";
    const { header, sidebar } = await this.baseRender();
    const { company } = req.user;
    const banner = new Banner();
    const model = new GetAllBannersFilterModel(req.query);
    const { root, seo } = await banner.render(model, company);
    return res.render("template", { root, seo, header, sidebar });
  };

  private getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const category = await this.bannerGetById.executeAsync(id, company);
    return res.json(category);
  };

  private create = async (req: Request, res: Response) => {
    const { title, url, bannerCategory, imageUpload, active } = req.body;
    const { company } = req.user;
    const model = new BannerCreateDataModel(
      title,
      url,
      active,
      bannerCategory,
      imageUpload
    );
    const category = await this.bannerCreate.executeAsync(model, company);
    return res.json(category);
  };

  private update = async (req: Request, res: Response) => {
    const { id: paramId } = req.params;
    const { id, title, url, bannerCategory, imageUpload, active } = req.body;
    if (id !== paramId) {
      throw new Error(Messages.invalidId);
    }
    const { company } = req.user;
    const model = new BannerUpdateDataModel(
      id,
      title,
      url,
      active,
      bannerCategory,
      imageUpload
    );
    const category = await this.bannerUpdate.executeAsync(model, company);
    return res.json(category);
  };

  private delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const category = await this.bannerDelete.executeAsync(id, company);
    return res.json(category);
  };
}

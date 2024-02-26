import { Messages } from "@application/messages/Messages";
import { Roles } from "@application/messages/Roles";
import {
  BannerCategoryCreateDataModel,
  BannerCategoryUpdateDataModel,
  GetAllBannersCategoriesFilterModel,
} from "@application/model/publicity/bannerCategory";
import {
  CompanyCreateDataModel,
  CompanyUpdateDataModel,
  GetAllCompanyFilterModel,
} from "@application/model/webeditor/company";
import {
  CompanyCreate,
  CompanyDelete,
  CompanyGetById,
  CompanyUpdate,
} from "@application/usecase/webeditor/company";
import { Authorize } from "@web/webeditor/authorize";
import { Pug } from "@web/webeditor/models/Pug";
import { BannerCategory } from "@web/webeditor/views/publicity/bannerCategory";
import { Company } from "@web/webeditor/views/system/company";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class CompanyRoutes extends Pug {
  router = Router();
  authorize = new Authorize();
  companyGetById = container.resolve(CompanyGetById);
  companyCreate = container.resolve(CompanyCreate);
  companyUpdate = container.resolve(CompanyUpdate);
  companyDelete = container.resolve(CompanyDelete);

  constructor(readonly baseRender: any) {
    super();
    this.router.get(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.companies.view, true),
      this.show
    );
    this.router.get(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.companies.update),
      this.getById
    );
    this.router.post(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.companies.update),
      this.create
    );
    this.router.put(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.companies.update),
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
    const company = new Company();
    const model = new GetAllCompanyFilterModel(req.query);
    const { root, seo } = await company.render(model);
    return res.render("template", { root, seo, header, sidebar });
  };

  private getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const company = await this.companyGetById.executeAsync(id);
    return res.json(company);
  };

  private create = async (req: Request, res: Response) => {
    const { name } = req.body;
    const model = new CompanyCreateDataModel(name, []);
    const company = await this.companyCreate.executeAsync(model);
    return res.json(company);
  };

  private update = async (req: Request, res: Response) => {
    const { id: paramId } = req.params;
    const { id, name } = req.body;
    if (id !== paramId) {
      throw new Error(Messages.invalidId);
    }
    const model = new CompanyUpdateDataModel(id, name, []);
    const company = await this.companyUpdate.executeAsync(model);
    return res.json(company);
  };

  private delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const company = await this.companyDelete.executeAsync(id);
    return res.json(company);
  };
}

import { Messages } from "@application/messages/Messages";
import { Roles } from "@application/messages/Roles";
import {
  GetAllCategoryFilterModel,
  CategoryCreateDataModel,
  CategoryUpdateDataModel,
} from "@application/model/culinary/category";
import {
  CategoryCreate,
  CategoryDelete,
  CategoryGetById,
  CategoryUpdate,
} from "@application/usecase/culinary/category";
import { Authorize } from "@web/webeditor/authorize";
import { Pug } from "@web/webeditor/models/Pug";
import { Category } from "@web/webeditor/views/culinary/category";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class CategoriesRoutes extends Pug {
  router = Router();
  authorize = new Authorize();
  categoriesGetById = container.resolve(CategoryGetById);
  categoryCreate = container.resolve(CategoryCreate);
  categoryUpdate = container.resolve(CategoryUpdate);
  categoryDelete = container.resolve(CategoryDelete);

  constructor(readonly baseRender: any) {
    super();
    this.router.get(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.categories.view, true),
      this.show
    );
    this.router.get(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.categories.update),
      this.getById
    );
    this.router.post(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.categories.update),
      this.create
    );
    this.router.put(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.categories.update),
      this.update
    );
    this.router.delete(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.categories.delete),
      this.delete
    );
  }

  private show = async (req: Request, res: Response) => {
    req.query.page = req.query.page ?? "1";
    req.query.pageSize = req.query.pageSize ?? "20";
    req.query.desc = req.query.desc ?? "false";
    const { header, sidebar } = await this.baseRender();
    const { company } = req.user;
    const category = new Category();
    const model = new GetAllCategoryFilterModel(req.query);
    const { root, seo } = await category.render(model, company);
    return res.render("template", { root, seo, header, sidebar });
  };

  private getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const category = await this.categoriesGetById.executeAsync(id, company);
    return res.json(category);
  };

  private create = async (req: Request, res: Response) => {
    const { name, levelId, active } = req.body;
    const { company } = req.user;
    const model = new CategoryCreateDataModel(name, active, levelId);
    const category = await this.categoryCreate.executeAsync(model, company);
    return res.json(category);
  };

  private update = async (req: Request, res: Response) => {
    const { id: paramId } = req.params;
    const { id, slug, name, levelId, active } = req.body;
    if (id !== paramId) {
      throw new Error(Messages.invalidId);
    }
    const { company } = req.user;
    const model = new CategoryUpdateDataModel(id, slug, name, active, levelId);
    const category = await this.categoryUpdate.executeAsync(model, company);
    return res.json(category);
  };

  private delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const category = await this.categoryDelete.executeAsync(id, company);
    return res.json(category);
  };
}

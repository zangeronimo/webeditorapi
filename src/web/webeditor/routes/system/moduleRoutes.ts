import { Messages } from "@application/messages/Messages";
import { Roles } from "@application/messages/Roles";
import {
  ModuleCreateDataModel,
  ModuleUpdateDataModel,
  GetAllModuleFilterModel,
} from "@application/model/webeditor/module";
import {
  ModuleCreate,
  ModuleDelete,
  ModuleGetById,
  ModuleUpdate,
} from "@application/usecase/webeditor/module";
import { Authorize } from "@web/webeditor/authorize";
import { Pug } from "@web/webeditor/models/Pug";
import { Module } from "@web/webeditor/views/system/module";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class ModuleRoutes extends Pug {
  router = Router();
  authorize = new Authorize();
  moduleGetById = container.resolve(ModuleGetById);
  moduleCreate = container.resolve(ModuleCreate);
  moduleUpdate = container.resolve(ModuleUpdate);
  moduleDelete = container.resolve(ModuleDelete);

  constructor(readonly baseRender: any) {
    super();
    this.router.get(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.modules.view, true),
      this.show
    );
    this.router.get(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.modules.update),
      this.getById
    );
    this.router.post(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.modules.update),
      this.create
    );
    this.router.put(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.modules.update),
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
    const module = new Module();
    const model = new GetAllModuleFilterModel(req.query);
    const { root, seo } = await module.render(model);
    return res.render("template", { root, seo, header, sidebar });
  };

  private getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const module = await this.moduleGetById.executeAsync(id);
    return res.json(module);
  };

  private create = async (req: Request, res: Response) => {
    const { name } = req.body;
    const model = new ModuleCreateDataModel(name);
    const module = await this.moduleCreate.executeAsync(model);
    return res.json(module);
  };

  private update = async (req: Request, res: Response) => {
    const { id: paramId } = req.params;
    const { id, name } = req.body;
    if (id !== paramId) {
      throw new Error(Messages.invalidId);
    }
    const model = new ModuleUpdateDataModel(id, name);
    const module = await this.moduleUpdate.executeAsync(model);
    return res.json(module);
  };

  private delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const module = await this.moduleDelete.executeAsync(id);
    return res.json(module);
  };
}

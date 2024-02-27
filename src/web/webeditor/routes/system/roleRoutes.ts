import { Messages } from "@application/messages/Messages";
import { Roles } from "@application/messages/Roles";
import {
  RoleCreateDataModel,
  RoleUpdateDataModel,
  GetAllRoleFilterModel,
} from "@application/model/webeditor/role";
import {
  RoleCreate,
  RoleDelete,
  RoleGetById,
  RoleUpdate,
} from "@application/usecase/webeditor/role";
import { Authorize } from "@web/webeditor/authorize";
import { Pug } from "@web/webeditor/models/Pug";
import { Role } from "@web/webeditor/views/system/role";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class RoleRoutes extends Pug {
  router = Router();
  authorize = new Authorize();
  roleGetById = container.resolve(RoleGetById);
  roleCreate = container.resolve(RoleCreate);
  roleUpdate = container.resolve(RoleUpdate);
  roleDelete = container.resolve(RoleDelete);

  constructor(readonly baseRender: any) {
    super();
    this.router.get(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.roles.view, true),
      this.show
    );
    this.router.get(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.roles.update),
      this.getById
    );
    this.router.post(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.roles.update),
      this.create
    );
    this.router.put(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.roles.update),
      this.update
    );
    this.router.delete(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.roles.delete),
      this.delete
    );
  }

  private show = async (req: Request, res: Response) => {
    req.query.page = req.query.page ?? "1";
    req.query.pageSize = req.query.pageSize ?? "20";
    const { header, sidebar } = await this.baseRender();
    const role = new Role();
    const model = new GetAllRoleFilterModel(req.query);
    const { root, seo } = await role.render(model);
    return res.render("template", { root, seo, header, sidebar });
  };

  private getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const role = await this.roleGetById.executeAsync(id);
    return res.json(role);
  };

  private create = async (req: Request, res: Response) => {
    const { name, label, order, moduleId } = req.body;
    const model = new RoleCreateDataModel(name, label, order, moduleId);
    const role = await this.roleCreate.executeAsync(model);
    return res.json(role);
  };

  private update = async (req: Request, res: Response) => {
    const { id: paramId } = req.params;
    const { id, name, label, order, moduleId } = req.body;
    if (id !== paramId) {
      throw new Error(Messages.invalidId);
    }
    const model = new RoleUpdateDataModel(id, name, label, order, moduleId);
    const role = await this.roleUpdate.executeAsync(model);
    return res.json(role);
  };

  private delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const role = await this.roleDelete.executeAsync(id);
    return res.json(role);
  };
}

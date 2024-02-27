import { Messages } from "@application/messages/Messages";
import { Roles } from "@application/messages/Roles";
import {
  GetAllUserFilterModel,
  UserCreateDataModel,
  UserUpdateDataModel,
} from "@application/model/webeditor/user";
import {
  UserCreate,
  UserDelete,
  UserGetById,
  UserUpdate,
} from "@application/usecase/webeditor/user";
import { Authorize } from "@web/webeditor/authorize";
import { Pug } from "@web/webeditor/models/Pug";
import { User } from "@web/webeditor/views/system/user";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class UserRoutes extends Pug {
  router = Router();
  authorize = new Authorize();
  userGetById = container.resolve(UserGetById);
  userCreate = container.resolve(UserCreate);
  userUpdate = container.resolve(UserUpdate);
  userDelete = container.resolve(UserDelete);

  constructor(readonly baseRender: any) {
    super();
    this.router.get(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.users.view, true),
      this.show
    );
    this.router.get(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.users.update),
      this.getById
    );
    this.router.post(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.users.update),
      this.create
    );
    this.router.put(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.users.update),
      this.update
    );
    this.router.delete(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.webeditor.users.delete),
      this.delete
    );
  }

  private show = async (req: Request, res: Response) => {
    req.query.page = req.query.page ?? "1";
    req.query.pageSize = req.query.pageSize ?? "20";
    const { header, sidebar } = await this.baseRender();
    const { company } = req.user;
    const user = new User();
    const model = new GetAllUserFilterModel(req.query);
    const { root, seo } = await user.render(model, company);
    return res.render("template", { root, seo, header, sidebar });
  };

  private getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const user = await this.userGetById.executeAsync(id, company);
    return res.json(user);
  };

  private create = async (req: Request, res: Response) => {
    const { name, email, password, roles } = req.body;
    const { company } = req.user;
    const model = new UserCreateDataModel(name, email, password, roles);
    const user = await this.userCreate.executeAsync(model, company);
    return res.json(user);
  };

  private update = async (req: Request, res: Response) => {
    const { id: paramId } = req.params;
    const { id, name, email, password, roles } = req.body;
    const { company } = req.user;
    if (id !== paramId) {
      throw new Error(Messages.invalidId);
    }
    const model = new UserUpdateDataModel(id, name, email, password, roles);
    const user = await this.userUpdate.executeAsync(model, company);
    return res.json(user);
  };

  private delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const user = await this.userDelete.executeAsync(id, company);
    return res.json(user);
  };
}

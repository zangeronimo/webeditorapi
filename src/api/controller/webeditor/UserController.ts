import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  IUserCreate,
  IUserDelete,
  IUserGetAll,
  IUserGetById,
  IUserUpdate,
} from "@application/interface/usecase/webeditor/user";
import {
  GetAllUserFilterModel,
  UserCreateDataModel,
  UserUpdateDataModel,
} from "@application/model/webeditor/user";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";

export class UserController {
  @inject("IUserGetAll")
  userGetAll?: IUserGetAll;
  @inject("IUserGetById")
  userGetById?: IUserGetById;
  @inject("IUserCreate")
  userCreate?: IUserCreate;
  @inject("IUserUpdate")
  userUpdate?: IUserUpdate;
  @inject("IUserDelete")
  userDelete?: IUserDelete;

  router = Router();

  constructor(
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole
  ) {
    this.router.get(
      "/",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_USER_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_USER_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_USER_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_USER_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_USER_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllUserFilterModel = new GetAllUserFilterModel(req.query);
      const users = await this.userGetAll?.executeAsync(
        getAllUserFilterModel,
        company
      );
      return res.json(users);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const user = await this.userGetById?.executeAsync(id, company);
      return res.json(user);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, email, password, roles } = req.body;
      const userCreateDataModel = new UserCreateDataModel(
        name,
        email,
        password,
        roles
      );
      const user = await this.userCreate?.executeAsync(
        userCreateDataModel,
        company
      );
      return res.status(201).json(user);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id, name, email, password, roles } = req.body;
      const userUpdateDataModel = new UserUpdateDataModel(
        id,
        name,
        email,
        password,
        roles
      );
      const user = await this.userUpdate?.executeAsync(
        userUpdateDataModel,
        company
      );
      return res.json(user);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const user = await this.userDelete?.executeAsync(id, company);
      return res.json(user);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

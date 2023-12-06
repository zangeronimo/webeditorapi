import { EnsureAuthenticated } from "@api/midleware/EnsureAuthenticated";
import { EnsureHasRole } from "@api/midleware/EnsureHasRole";
import { IUserCreate } from "@application/interface/usecase/webeditor/user/IUserCreate";
import { IUserDelete } from "@application/interface/usecase/webeditor/user/IUserDelete";
import { IUserGetAll } from "@application/interface/usecase/webeditor/user/IUserGetAll";
import { IUserGetById } from "@application/interface/usecase/webeditor/user/IUserGetById";
import { IUserUpdate } from "@application/interface/usecase/webeditor/user/IUserUpdate";
import { GetAllUserFilterModel } from "@application/model/webeditor/user/GetAllUserFilterModel";
import { UserCreateDataModel } from "@application/model/webeditor/user/UserCreateModel";
import { UserUpdateDataModel } from "@application/model/webeditor/user/UserUpdateModel";
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
      ensureHasRole.execute("WEBEDITOR_USER_VIEW"),
      this.getAll
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.execute("WEBEDITOR_USER_VIEW"),
      this.getById
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.execute("WEBEDITOR_USER_UPDATE"),
      this.create
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.execute("WEBEDITOR_USER_UPDATE"),
      this.update
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.execute("WEBEDITOR_USER_DELETE"),
      this.delete
    );
  }

  private getAll = async (req: Request, res: Response) => {
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

  private getById = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const user = await this.userGetById?.executeAsync(id, company);
      return res.json(user);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private create = async (req: Request, res: Response) => {
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

  private update = async (req: Request, res: Response) => {
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

  private delete = async (req: Request, res: Response) => {
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

import { EnsureAuthenticated } from "@api/midleware/EnsureAuthenticated";
import { EnsureHasRole } from "@api/midleware/EnsureHasRole";
import { IUserCreate } from "@application/interface/usercase/webeditor/user/IUserCreate";
import { IUserDelete } from "@application/interface/usercase/webeditor/user/IUserDelete";
import { IUserGetAll } from "@application/interface/usercase/webeditor/user/IUserGetAll";
import { IUserGetById } from "@application/interface/usercase/webeditor/user/IUserGetById";
import { IUserUpdate } from "@application/interface/usercase/webeditor/user/IUserUpdate";
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
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_USER_VIEW"),
      this.GetAll
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_USER_VIEW"),
      this.GetById
    );
    this.router.post(
      "",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_USER_UPDATE"),
      this.Create
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_USER_UPDATE"),
      this.Update
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_USER_DELETE"),
      this.Delete
    );
  }

  GetAll = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllUserFilterModel = new GetAllUserFilterModel(req.query);
      const users = await this.userGetAll?.ExecuteAsync(
        getAllUserFilterModel,
        company
      );
      return res.json(users);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  GetById = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const user = await this.userGetById?.ExecuteAsync(id, company);
      return res.json(user);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  Create = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, email, password, roles } = req.body;
      const userCreateDataModel = new UserCreateDataModel(
        name,
        email,
        password,
        roles
      );
      const user = await this.userCreate?.ExecuteAsync(
        userCreateDataModel,
        company
      );
      return res.status(201).json(user);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  Update = async (req: Request, res: Response) => {
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
      const user = await this.userUpdate?.ExecuteAsync(
        userUpdateDataModel,
        company
      );
      return res.json(user);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  Delete = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const user = await this.userDelete?.ExecuteAsync(id, company);
      return res.json(user);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

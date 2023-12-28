import { EnsureAuthenticated, EnsureHasRole, IEnsureAuthenticated, IEnsureHasRole } from "@api/midleware";
import {
  GetAllUserFilterModel,
  UserCreateDataModel,
  UserUpdateDataModel,
} from "@application/model/webeditor/user";
import { UserCreate, UserDelete, UserGetAll, UserGetById, UserUpdate } from "@application/usecase/webeditor/user";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class UserController {
  router = Router();
  userGetAll = container.resolve(UserGetAll)
  userGetById = container.resolve(UserGetById)
  userCreate = container.resolve(UserCreate)
  userUpdate = container.resolve(UserUpdate)
  userDelete = container.resolve(UserDelete)
  ensureAuthenticated = container.resolve(EnsureAuthenticated)
  ensureHasRole = container.resolve(EnsureHasRole)


  constructor() {
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_USER_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_USER_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_USER_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_USER_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_USER_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllUserFilterModel = new GetAllUserFilterModel(req.query);
      const users = await this.userGetAll.executeAsync(
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
      const user = await this.userGetById.executeAsync(id, company);
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
      const user = await this.userCreate.executeAsync(
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
      const user = await this.userUpdate.executeAsync(
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
      const user = await this.userDelete.executeAsync(id, company);
      return res.json(user);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

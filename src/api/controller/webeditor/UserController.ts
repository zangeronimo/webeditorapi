import { IUserDelete } from "@application/interface/usercase/IUserDelete";
import { IUserGetAll } from "@application/interface/usercase/IUserGetAll";
import { IUserGetById } from "@application/interface/usercase/IUserGetById";
import { GetAllUserFilterModel } from "@application/model/GetAllUserFilterModel";
import { inject } from "@infra/di/Inject";
import { Request, Response } from "express";

export class UserController {
  @inject("IUserGetAll")
  userGetAll?: IUserGetAll;
  @inject("IUserGetById")
  userGetById?: IUserGetById;
  @inject("IUserDelete")
  userDelete?: IUserDelete;

  constructor() {}

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

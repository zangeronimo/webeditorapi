import { IMakeLogin } from "@application/interface/usercase/IMakeLogin";
import { IUserGetAll } from "@application/interface/usercase/IUserGetAll";
import { GetAllUserFilterModel } from "@application/model/GetAllUserFilterModel";
import { inject } from "@infra/di/Inject";
import { Request, Response } from "express";

export class UserController {
  @inject("IUserGetAll")
  userGetAll?: IUserGetAll;

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
}

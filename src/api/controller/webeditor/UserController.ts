import { IMakeLogin } from "@application/interface/usercase/IMakeLogin";
import { IUserGetAll } from "@application/interface/usercase/IUserGetAll";
import { inject } from "@infra/di/Inject";
import { Request, Response } from "express";

export class UserController {
  @inject("IUserGetAll")
  userGetAll?: IUserGetAll;

  constructor() {}

  GetAll = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const users = await this.userGetAll?.ExecuteAsync(company);
      return res.json(users);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

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
      //  const { id: user, company } = req.user;
      //  console.log(user, company);
      const users = await this.userGetAll?.ExecuteAsync();
      return res.json(users);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

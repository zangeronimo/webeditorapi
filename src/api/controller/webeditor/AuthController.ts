import { IMakeLogin } from "@application/interface/usercase/IMakeLogin";
import { inject } from "@infra/di/Inject";
import { Request, Response } from "express";

export class AuthController {
  @inject("IMakeLogin")
  makeLogin?: IMakeLogin;

  constructor() {}

  Login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const token = await this.makeLogin?.ExecuteAsync(username, password);
      return res.json(token);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

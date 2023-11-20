import { IMakeLogin } from "@application/interface/usecase/webeditor/IMakeLogin";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";

export class AuthController {
  @inject("IMakeLogin")
  makeLogin?: IMakeLogin;

  router = Router();

  constructor() {
    this.router.post("/", this.Login);
  }

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

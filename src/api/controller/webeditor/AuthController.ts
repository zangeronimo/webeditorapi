import { IMakeLogin } from "@application/interface/usecase/webeditor/IMakeLogin";
import { IRefreshToken } from "@application/interface/usecase/webeditor/IRefreshToken";
import { Messages } from "@application/messages/Messages";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";

export class AuthController {
  @inject("IMakeLogin")
  makeLogin?: IMakeLogin;
  @inject("IRefreshToken")
  refreshToken?: IRefreshToken;

  router = Router();

  constructor() {
    this.router.post("/login", this.Login);
    this.router.post("/refresh", this.Refresh);
  }

  Login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const { token, refreshToken } = await this.makeLogin?.ExecuteAsync(
        username,
        password
      )!;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
      });
      return res.json(token);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  Refresh = async (req: Request, res: Response) => {
    try {
      const refresh = req.headers.cookie
        ?.split("; ")
        .find((item) => item.includes("refreshToken"))
        ?.replace("refreshToken=", "");
      if (!refresh) {
        throw new Error(Messages.InvalidJwtToken);
      }
      const { token, refreshToken } = await this.refreshToken?.ExecuteAsync(
        refresh
      )!;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
      });
      return res.json(token);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

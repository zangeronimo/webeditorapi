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
    this.router.post("/", this.Auth);
  }

  Auth = async (req: Request, res: Response) => {
    const { grant_type } = req.body;
    if (grant_type === "password") return this.Login(req, res);
    if (grant_type === "refresh_token") return this.Refresh(req, res);
    throw new Error(Messages.InvalidGrantType);
  };

  private Login = async (req: Request, res: Response) => {
    try {
      console.log("making login");
      const { username, password } = req.body;
      const { token, refreshToken } = await this.makeLogin?.ExecuteAsync(
        username,
        password
      )!;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(new Date().getTime() + 3600000),
        secure: true,
      });
      return res.json(token);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private Refresh = async (req: Request, res: Response) => {
    try {
      console.log(req);
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
        sameSite: "strict",
        expires: new Date(new Date().getTime() + 3600000),
        secure: true,
      });
      return res.json(token);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

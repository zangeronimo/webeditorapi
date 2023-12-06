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
    this.router.post("/", this.auth);
  }

  private auth = async (req: Request, res: Response) => {
    try {
      const { grant_type } = req.body;
      if (grant_type === "password") return this.login(req, res);
      if (grant_type === "refresh_token") return this.refresh(req, res);
      throw new Error(Messages.invalidGrantType);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const { token, refreshToken } = await this.makeLogin?.executeAsync(
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

  private refresh = async (req: Request, res: Response) => {
    try {
      const refresh = req.headers.cookie
        ?.split("; ")
        .find((item) => item.includes("refreshToken"))
        ?.replace("refreshToken=", "");
      if (!refresh) {
        throw new Error(Messages.invalidJwtToken);
      }
      const { token, refreshToken } = await this.refreshToken?.executeAsync(
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

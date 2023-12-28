import { Messages } from "@application/messages/Messages";
import { MakeLogin, RefreshToken } from "@application/usecase/webeditor";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class AuthController {
  router = Router();
  makeLogin = container.resolve(MakeLogin)
  refreshToken = container.resolve(RefreshToken)

  constructor() {
    this.router.post("/", this.auth);
  }

  private auth = (req: Request, res: Response) => {
    try {
      const { grant_type } = req.body;
      if (grant_type === "password") return this.loginAsync(req, res);
      if (grant_type === "refresh_token") return this.refreshAsync(req, res);
      throw new Error(Messages.invalidGrantType);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private loginAsync = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const { token, refreshToken } = await this.makeLogin.executeAsync(
        username,
        password
      )!;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(new Date().getTime() + +process.env.REFRESH_EXP!),
        secure: true,
      });
      return res.json(token);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private refreshAsync = async (req: Request, res: Response) => {
    try {
      const refresh = req.headers.cookie
        ?.split("; ")
        .find((item) => item.includes("refreshToken"))
        ?.replace("refreshToken=", "");
      if (!refresh) {
        throw new Error(Messages.invalidJwtToken);
      }
      const { token, refreshToken } = await this.refreshToken.executeAsync(
        refresh
      )!;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(new Date().getTime() + +process.env.REFRESH_EXP!),
        secure: true,
      });
      return res.json(token);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

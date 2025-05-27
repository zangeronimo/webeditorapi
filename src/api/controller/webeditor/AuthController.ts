import { Messages } from "@application/messages/Messages";
import { MakeLogin, RefreshToken } from "@application/usecase/webeditor";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class AuthController {
  router = Router();
  makeLogin = container.resolve(MakeLogin);
  refreshToken = container.resolve(RefreshToken);

  constructor() {
    this.router.post("/", this.auth);
  }

  private auth = (req: Request, res: Response): void => {
    try {
      const { grant_type } = req.body;
      if (grant_type === "password") this.loginAsync(req, res);
      else if (grant_type === "refresh_token") this.refreshAsync(req, res);
      else throw new Error(Messages.invalidGrantType);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private loginAsync = async (req: Request, res: Response): Promise<void> => {
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
      res.json(token);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private refreshAsync = async (req: Request, res: Response): Promise<void> => {
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
      res.json(token);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };
}

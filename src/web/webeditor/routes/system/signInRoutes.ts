import { MakeLogin } from "@application/usecase/webeditor";
import { Pug } from "@web/webeditor/models/Pug";
import { SignIn } from "@web/webeditor/views/signIn";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class SignInRoutes extends Pug {
  router = Router();
  makeLogin = container.resolve(MakeLogin);

  constructor(readonly baseRender: any) {
    super();
    this.router.get("/", this.show);
    this.router.post("/", this.loginAsync);
  }

  private show = async (req: Request, res: Response) => {
    try {
      const signIn = new SignIn();
      const { root, seo } = await signIn.render();
      const page = { root, seo };
      return res.render("auth", page);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private loginAsync = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const { user, token, refreshToken } = await this.makeLogin.executeAsync(
        username,
        password
      )!;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(new Date().getTime() + +process.env.REFRESH_EXP!),
        secure: true,
      });
      return res.json({ user, token });
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

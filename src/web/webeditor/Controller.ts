import { MakeLogin, RefreshToken } from "@application/usecase/webeditor";
import { Request, Response, Router } from "express";
import path from "path";
import pug from "pug";
import { container } from "tsyringe";
import { Dashboard } from "./views/dashboard";
import { SignIn } from "./views/signIn";
import { Messages } from "@application/messages/Messages";
import { EnsureAuthenticated } from "@api/midleware";
import { Authorize } from "./Authorize";
import { SideBar } from "./views/components/sidebar";

export class Controller extends Authorize {
  router = Router();
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  makeLogin = container.resolve(MakeLogin);
  refreshToken = container.resolve(RefreshToken);

  constructor() {
    super();
    this.router.get("/sign-in", this.signIn);
    this.router.post("/sign-in", this.loginAsync);
    this.router.post("/sign-out", this.signOutAsync);
    this.router.get("/", this.dashboard);
  }

  private signIn = async (req: Request, res: Response) => {
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
      const { user, refreshToken } = await this.makeLogin.executeAsync(
        username,
        password
      )!;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(new Date().getTime() + +process.env.REFRESH_EXP!),
        secure: true,
      });
      return res.json({ user });
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private signOutAsync = async (req: Request, res: Response) => {
    try {
      res.cookie("refreshToken", "", {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(new Date().getTime()),
        secure: true,
      });
      return res.status(204).json();
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private dashboard = async (req: Request, res: Response) => {
    try {
      const { header, sidebar } = await this.baseRender();
      const dashboard = new Dashboard();
      const { root, seo } = await dashboard.render();
      const page = { header, sidebar, root, seo };
      return res.render("template", page);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private baseRender = async (query?: string) => {
    const header = () =>
      pug.renderFile(this.pugFile("components/header/index.pug"), { query });

    const sideBar = new SideBar();
    const sidebar = await sideBar.render(
      this.pugFile("components/sidebar/index.pug")
    );
    return { header, sidebar };
  };

  private pugFile = (pathFile: string) =>
    path.join(__dirname, "views", pathFile);
}

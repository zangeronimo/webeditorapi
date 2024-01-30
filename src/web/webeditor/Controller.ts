import { Request, Response, Router } from "express";
import path from "path";
import pug from "pug";
import { Dashboard } from "./views/dashboard";
import { Footer } from "./views/components/footer";
import { SideBar } from "./views/components/sidebar";
import { SignIn } from "./views/signIn";

export class Controller {
  router = Router();

  constructor() {
    this.router.get("/sign-in", this.signIn);
    this.router.get("/", this.dashboard);
  }

  private signIn = async (req: Request, res: Response) => {
    try {
      const signIn = new SignIn();
      const { root, seo } = await signIn.render();
      const page = { root, seo };
      return res.render("template", page);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private dashboard = async (req: Request, res: Response) => {
    try {
      const { header } = await this.baseRender();
      const dashboard = new Dashboard();
      const { root, seo } = await dashboard.render();
      const page = { header, root, seo };
      return res.render("template", page);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private baseRender = async (query?: string) => {
    const header = () =>
      pug.renderFile(this.pugFile("components/header/index.pug"), { query });

    // const footerService = new Footer();
    // const footer = await footerService.render(
    //   this.pugFile("components/footer/index.pug"),
    //   this.pugFile("components/newsletterForm/index.pug")
    // );

    // const sideBar = new SideBar();
    // const sidebar = await sideBar.render(
    //   this.pugFile("components/sidebar/index.pug")
    // );
    return { header };
  };

  private pugFile = (pathFile: string) =>
    path.join(__dirname, "views", pathFile);
}

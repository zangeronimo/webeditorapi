import { Request, Response, Router } from "express";
import path from "path";
import pug from "pug";
import { SideBar } from "./SideBar";
import { Dashboard } from "./Dashboard";

export class Controller {
  router = Router();

  constructor() {
    this.router.get("/", this.dashboard);
    this.router.get("/categoria/:level/:category", this.categories);
  }

  private dashboard = async (req: Request, res: Response) => {
    try {
      const { header, sidebar, footer } = await this.baseRender();
      const dashboard = new Dashboard();
      const root = await dashboard.render(this.pugFile("dashboard/index.pug"));
      const page = { header, sidebar, footer, root };
      return res.render("template", page);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private categories = async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const { header, sidebar, footer } = await this.baseRender();
      const page = { header, sidebar, footer, root: `Category ${category}` };
      return res.render("template", page);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private baseRender = async () => {
    const sideBar = new SideBar();
    const header = () => pug.renderFile(this.pugFile("header/index.pug"));
    const footer = () => pug.renderFile(this.pugFile("footer/index.pug"));
    const sidebar = await sideBar.render(this.pugFile("sidebar/index.pug"));
    return { header, footer, sidebar };
  };

  private pugFile = (pathFile: string) =>
    path.join(__dirname, "views", "includes", pathFile);
}

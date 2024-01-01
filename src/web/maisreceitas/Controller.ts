import { Request, Response, Router } from "express";
import path from "path";
import pug from "pug";
import { SideBar } from "./views/components/sidebar";
import { Dashboard } from "./views/dashboard";
import { Recipe } from "./views/recipe";
import { Category } from "./views/category";

export class Controller {
  router = Router();

  constructor() {
    this.router.get("/", this.dashboard);
    this.router.get("/categoria/:level/:category", this.categories);
    this.router.get("/receita/:recipe", this.recipe);
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
      const { level, category } = req.params;
      const { header, sidebar, footer } = await this.baseRender();
      const categoryService = new Category();
      const root = await categoryService.render(
        this.pugFile("category/index.pug"),
        level,
        category
      );
      const page = {
        header,
        sidebar,
        footer,
        root,
      };
      return res.render("template", page);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private recipe = async (req: Request, res: Response) => {
    try {
      const { recipe } = req.params;
      const { header, sidebar, footer } = await this.baseRender();
      const recipeService = new Recipe();
      const root = await recipeService.render(
        this.pugFile("recipe/index.pug"),
        recipe
      );
      const page = { header, sidebar, footer, root };
      return res.render("template", page);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private baseRender = async () => {
    const sideBar = new SideBar();
    const header = () =>
      pug.renderFile(this.pugFile("components/header/index.pug"));
    const footer = () =>
      pug.renderFile(this.pugFile("components/footer/index.pug"));
    const sidebar = await sideBar.render(
      this.pugFile("components/sidebar/index.pug")
    );
    return { header, footer, sidebar };
  };

  private pugFile = (pathFile: string) =>
    path.join(__dirname, "views", pathFile);
}

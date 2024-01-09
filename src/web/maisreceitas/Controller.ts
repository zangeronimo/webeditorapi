import { Request, Response, Router } from "express";
import path from "path";
import pug from "pug";
import { SideBar } from "./views/components/sidebar";
import { Dashboard } from "./views/dashboard";
import { Recipe } from "./views/recipe";
import { Category } from "./views/category";
import { Sitemap } from "./views/sitemap";
import { Pesquisar } from "./views/pesquisar";

export class Controller {
  router = Router();

  constructor() {
    this.router.get("/robots.txt", (req: Request, res: Response) =>
      res.send(`
        User-agent: *<br />
        Allow: /<br />
        Disallow: /pesquisar`)
    );
    this.router.get("/Ads.txt", (req: Request, res: Response) =>
      res.send("google.com, pub-9066340169838562, DIRECT, f08c47fec0942fa0")
    );

    this.router.get("/sitemap.xml", this.generateSitemap);
    this.router.get("/", this.dashboard);
    this.router.get("/pesquisar", this.pesquisar);
    this.router.get("/categoria/:level/:category", this.categories);
    this.router.get("/receita/:recipe", this.recipe);
    this.router.post("/receita/:recipe", this.recipeRating);
  }

  private dashboard = async (req: Request, res: Response) => {
    try {
      const { header, sidebar, footer } = await this.baseRender();
      const dashboard = new Dashboard();
      const { root, seo } = await dashboard.render(
        this.pugFile("dashboard/index.pug")
      );
      const page = { header, sidebar, footer, root, seo };
      return res.render("template", page);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private pesquisar = async (req: Request, res: Response) => {
    try {
      const { search } = req.query;
      if (!search) throw new Error("Nothing to search");
      const { header, sidebar, footer } = await this.baseRender(
        search!.toString()
      );
      const pesquisarService = new Pesquisar();
      const { root, seo } = await pesquisarService.render(
        this.pugFile("pesquisar/index.pug"),
        search!.toString()
      );
      const page = {
        header,
        sidebar,
        footer,
        root,
        seo,
      };
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
      const { root, seo } = await categoryService.render(
        this.pugFile("category/index.pug"),
        level,
        category
      );
      const page = {
        header,
        sidebar,
        footer,
        root,
        seo,
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
      const { root, seo } = await recipeService.render(
        this.pugFile("recipe/index.pug"),
        this.pugFile("components/ratingList/index.pug"),
        this.pugFile("components/ratingForm/index.pug"),
        recipe
      );
      const page = { header, sidebar, footer, root, seo };
      return res.render("template", page);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private recipeRating = async (req: Request, res: Response) => {
    try {
      const { recipe } = req.params;
      const { rate, name, comment } = req.body;
      const recipeService = new Recipe();
      const rating = await recipeService.rate(recipe, rate, name, comment);
      return res.status(201).json(rating);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private generateSitemap = async (req: Request, res: Response) => {
    try {
      const sitemap = new Sitemap();
      const recipes = await sitemap.getSitemap();
      res.setHeader("Content-Type", "application/xml");
      return res.render(this.pugFile("sitemap/index.pug"), {
        recipes,
        baseUrl: process.env.MAISRECEITAS_URL!,
      });
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private baseRender = async (query?: string) => {
    const sideBar = new SideBar();
    const header = () =>
      pug.renderFile(this.pugFile("components/header/index.pug"), { query });
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

import { IEnsureHasInternalSecret } from "@api/midleware/EnsureHasInternalSecret";
import { IRecipeDao } from "@application/interface/dao/culinary/IRecipeDao";
import { RecipeGetBySearchDao } from "@application/model/web/culinary/RecipeBySearchDao";
import { RecipeGetAllDao } from "@application/model/web/culinary/RecipeGetAllDao";
import { Slug } from "@domain/valueObject/Slug";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class RecipeController {
  router = Router();
  ensureHasInternalSecret = container.resolve<IEnsureHasInternalSecret>(
    "IEnsureHasInternalSecret"
  );
  recipeDao = container.resolve<IRecipeDao>("IRecipeDao");

  constructor() {
    this.router.get(
      "/",
      this.ensureHasInternalSecret.executeAsync(),
      this.getAllWithImageAsync
    );
    this.router.get(
      "/search",
      this.ensureHasInternalSecret.executeAsync(),
      this.getBySearchAsync
    );
    this.router.get(
      "/:slug",
      this.ensureHasInternalSecret.executeAsync(),
      this.getBySlugAsync
    );
  }

  private getAllWithImageAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const model = new RecipeGetAllDao(10, true);
      const data = await this.recipeDao.getAllAsync(model, company);
      res.status(200).json(data);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private getBySlugAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { slug } = req.params;
      const data = await this.recipeDao.getBySlugAsync(
        Slug.create(slug),
        company
      );
      res.status(200).json(data);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private getBySearchAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { q, category, time, difficulty } = req.query;
      const model = new RecipeGetBySearchDao(
        q as string,
        category as string,
        time as string,
        difficulty as string
      );
      const data = await this.recipeDao.getBySearchAsync(model, company);
      res.status(200).json(data);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };
}

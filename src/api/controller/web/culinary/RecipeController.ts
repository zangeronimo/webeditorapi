import { IEnsureHasInternalSecret } from "@api/midleware/EnsureHasInternalSecret";
import { IRecipeDao } from "@application/interface/dao/culinary/IRecipeDao";
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
  }

  private getAllWithImageAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const data = await this.recipeDao.getWithImageAsync(10, company);
      res.status(200).json(data);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };
}

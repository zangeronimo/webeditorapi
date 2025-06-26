import { IEnsureHasInternalSecret } from "@api/midleware/EnsureHasInternalSecret";
import { IRecipeService } from "@application/interface/service/culinary/IRecipeService";
import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class RecipeController {
  router = Router();
  ensureHasInternalSecret = container.resolve<IEnsureHasInternalSecret>(
    "IEnsureHasInternalSecret"
  );
  recipeService = container.resolve<IRecipeService>("IRecipeService");

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
      const model = new GetAllWithImageFilterModel();
      model.random = true;

      const data = await this.recipeService.getWithImageAsync(model, company);
      res.status(200).json(data);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };
}

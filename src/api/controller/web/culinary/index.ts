import { Router } from "express";
import { RecipeController } from "./RecipeController";

export class WebCulinaryRouters {
  static init = (router: Router) => {
    const recipeController = new RecipeController();

    router.use("/web/culinary/recipe", recipeController.router);
  };
}

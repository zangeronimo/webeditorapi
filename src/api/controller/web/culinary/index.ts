import { Router } from "express";
import { RecipeController } from "./RecipeController";
import { LevelController } from "./LevelController";

export class WebCulinaryRouters {
  static init = (router: Router) => {
    const recipeController = new RecipeController();
    const levelController = new LevelController();

    router.use("/web/culinary/recipe", recipeController.router);
    router.use("/web/culinary/level", levelController.router);
  };
}

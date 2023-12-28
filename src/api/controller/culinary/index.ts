import { Router } from "express";
import { LevelController } from "./LevelController";
import { CategoryController } from "./CategoryController";
import { RecipeController } from "./RecipeController";
import { RatingController } from "./RatingController";

export class CulinaryRouters {
  static init = (
    router: Router
  ) => {
    const levelController = new LevelController();
    const categoryController = new CategoryController();
    const recipeController = new RecipeController();
    const ratingController = new RatingController();

    router.use("/culinary/level", levelController.router);
    router.use("/culinary/category", categoryController.router);
    router.use("/culinary/recipe", recipeController.router);
    router.use("/culinary/rating", ratingController.router);
  };
}

import { Router } from "express";
import { LevelController } from "./LevelController";
import { CategoryController } from "./CategoryController";
import { RecipeController } from "./RecipeController";
import { RatingController } from "./RatingController";
import { RecipeRecipesController } from "./RecipeRecipesController";
import { RatingRecipesController } from "./RatingRecipesController";

export class CulinaryRouters {
  static init = (router: Router) => {
    const levelController = new LevelController();
    const categoryController = new CategoryController();
    const recipeController = new RecipeController();
    const recipeRecipesController = new RecipeRecipesController();
    const ratingController = new RatingController();
    const ratingRecipesController = new RatingRecipesController();

    router.use("/culinary/level", levelController.router);
    router.use("/culinary/category", categoryController.router);
    router.use("/culinary/recipe", recipeController.router);
    router.use("/culinary/recipe-new", recipeRecipesController.router);
    router.use("/culinary/rating", ratingController.router);
    router.use("/culinary/rating-new", ratingRecipesController.router);
  };
}

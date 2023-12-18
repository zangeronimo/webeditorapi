import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import { Router } from "express";
import { LevelController } from "./LevelController";
import { CategoryController } from "./CategoryController";
import { RecipeController } from "./RecipeController";
import { RatingController } from "./RatingController";

export class CulinaryRouters {
  static init = (
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole,
    router: Router
  ) => {
    const levelController = new LevelController(
      ensureAuthenticated,
      ensureHasRole
    );
    const categoryController = new CategoryController(
      ensureAuthenticated,
      ensureHasRole
    );
    const recipeController = new RecipeController(
      ensureAuthenticated,
      ensureHasRole
    );
    const ratingController = new RatingController(
      ensureAuthenticated,
      ensureHasRole
    );

    router.use("/culinary/level", levelController.router);
    router.use("/culinary/category", categoryController.router);
    router.use("/culinary/recipe", recipeController.router);
    router.use("/culinary/rating", ratingController.router);
  };
}

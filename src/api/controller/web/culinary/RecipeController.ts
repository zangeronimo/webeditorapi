import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import {
  RecipeGetAll,
  RecipeGetById,
  RecipeCreate,
  RecipeUpdate,
  RecipeDelete,
} from "@application/usecase/culinary/recipe";
import { RecipeDeleteImage } from "@application/usecase/culinary/recipe/RecipeDeleteImage";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class RecipeController {
  router = Router();
  recipeGetAll = container.resolve(RecipeGetAll);
  recipeGetById = container.resolve(RecipeGetById);
  recipeCreate = container.resolve(RecipeCreate);
  recipeUpdate = container.resolve(RecipeUpdate);
  recipeDelete = container.resolve(RecipeDelete);
  recipeDeleteImage = container.resolve(RecipeDeleteImage);

  constructor() {
    this.router.get("/", this.getAllAsync);
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const data = [
        { id: "1", name: "Receita 1" },
        { id: "2", name: "Receita 2" },
        { id: "3", name: "Receita 3" },
        { id: "4", name: "Receita 4" },
        { id: "5", name: "Receita 5" },
        { id: "6", name: "Receita 6" },
      ];
      res.status(200).json(data);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };
}

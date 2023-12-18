import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  IRecipeGetAll,
  IRecipeGetById,
  IRecipeCreate,
  IRecipeUpdate,
  IRecipeDelete,
} from "@application/interface/usecase/culinary/recipe";
import {
  RecipeCreateDataModel,
  RecipeUpdateDataModel,
  GetAllRecipeFilterModel,
} from "@application/model/culinary/recipe";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";

export class RecipeController {
  @inject("IRecipeGetAll")
  recipeGetAll?: IRecipeGetAll;
  @inject("IRecipeGetById")
  recipeGetById?: IRecipeGetById;
  @inject("IRecipeCreate")
  recipeCreate?: IRecipeCreate;
  @inject("IRecipeUpdate")
  recipeUpdate?: IRecipeUpdate;
  @inject("IRecipeDelete")
  recipeDelete?: IRecipeDelete;

  router = Router();

  constructor(
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole
  ) {
    this.router.get(
      "/",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_RECIPE_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_RECIPE_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_RECIPE_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_RECIPE_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_RECIPE_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllRecipeFilterModel = new GetAllRecipeFilterModel(req.query);
      const recipes = await this.recipeGetAll?.executeAsync(
        getAllRecipeFilterModel,
        company
      );
      return res.json(recipes);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const recipe = await this.recipeGetById?.executeAsync(id, company);
      return res.json(recipe);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, ingredients, preparation, active, categoryId } = req.body;
      const recipeCreateDataModel = new RecipeCreateDataModel(
        name,
        ingredients,
        preparation,
        active,
        categoryId
      );
      const recipe = await this.recipeCreate?.executeAsync(
        recipeCreateDataModel,
        company
      );
      return res.status(201).json(recipe);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id, slug, name, ingredients, preparation, active, categoryId } =
        req.body;
      const recipeUpdateDataModel = new RecipeUpdateDataModel(
        id,
        slug,
        name,
        ingredients,
        preparation,
        active,
        categoryId
      );
      const recipe = await this.recipeUpdate?.executeAsync(
        recipeUpdateDataModel,
        company
      );
      return res.json(recipe);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const recipe = await this.recipeDelete?.executeAsync(id, company);
      return res.json(recipe);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

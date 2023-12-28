import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  GetAllRecipeFilterModel,
  RecipeCreateDataModel,
  RecipeUpdateDataModel,
} from "@application/model/culinary/recipe";
import { RecipeGetAll, RecipeGetById, RecipeCreate, RecipeUpdate, RecipeDelete } from "@application/usecase/culinary/recipe";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class RecipeController {
  router = Router();
  recipeGetAll = container.resolve(RecipeGetAll);
  recipeGetById = container.resolve(RecipeGetById);
  recipeCreate = container.resolve(RecipeCreate);
  recipeUpdate = container.resolve(RecipeUpdate);
  recipeDelete = container.resolve(RecipeDelete);
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  ensureHasRole = container.resolve(EnsureHasRole);

  constructor() {
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_RECIPE_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_RECIPE_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_RECIPE_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_RECIPE_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_RECIPE_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllRecipeFilterModel = new GetAllRecipeFilterModel(req.query);
      const recipes = await this.recipeGetAll.executeAsync(
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
      const recipe = await this.recipeGetById.executeAsync(id, company);
      return res.json(recipe);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const {
        name,
        ingredients,
        preparation,
        active,
        categoryId,
        imageUpload,
      } = req.body;
      const recipeCreateDataModel = new RecipeCreateDataModel(
        name,
        ingredients,
        preparation,
        active,
        categoryId,
        imageUpload
      );
      const recipe = await this.recipeCreate.executeAsync(
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
      const {
        id,
        slug,
        name,
        ingredients,
        preparation,
        active,
        categoryId,
        imageUpload,
      } = req.body;
      const recipeUpdateDataModel = new RecipeUpdateDataModel(
        id,
        slug,
        name,
        ingredients,
        preparation,
        active,
        categoryId,
        imageUpload
      );
      const recipe = await this.recipeUpdate.executeAsync(
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
      const recipe = await this.recipeDelete.executeAsync(id, company);
      return res.json(recipe);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

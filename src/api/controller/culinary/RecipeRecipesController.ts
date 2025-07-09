import { IEnsureAuthenticated, IEnsureHasRole } from "@api/midleware";
import {
  IRecipeCreate,
  IRecipeDelete,
  IRecipeGetAll,
  IRecipeGetById,
  IRecipeUpdate,
} from "@application/interface/usecase/culinary/recipe";
import { IRecipeDeleteImage } from "@application/interface/usecase/culinary/recipe/IRecipeDeleteImage";
import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import { RecipeRecipesCreateDataModel } from "@application/model/culinary/recipe/RecipeRecipesCreateModel";
import { RecipeRecipesUpdateDataModel } from "@application/model/culinary/recipe/RecipeRecipesUpdateModel";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class RecipeRecipesController {
  router = Router();
  recipeGetAll = container.resolve<IRecipeGetAll>("IRecipeGetAll");
  recipeGetById = container.resolve<IRecipeGetById>("IRecipeGetById");
  recipeCreate = container.resolve<IRecipeCreate>("IRecipeCreate");
  recipeUpdate = container.resolve<IRecipeUpdate>("IRecipeUpdate");
  recipeDelete = container.resolve<IRecipeDelete>("IRecipeDelete");
  recipeDeleteImage =
    container.resolve<IRecipeDeleteImage>("IRecipeDeleteImage");
  ensureAuthenticated = container.resolve<IEnsureAuthenticated>(
    "IEnsureAuthenticated"
  );
  ensureHasRole = container.resolve<IEnsureHasRole>("IEnsureHasRole");

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
    this.router.patch(
      "/delete-image/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_RECIPE_UPDATE"),
      this.deleteImageAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllRecipeFilterModel = new GetAllRecipeFilterModel(req.query);
      const recipes = await this.recipeGetAll.executeNewAsync(
        getAllRecipeFilterModel,
        company
      );
      res.json(recipes);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const recipe = await this.recipeGetById.executeNewAsync(id, company);
      res.json(recipe);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const {
        name,
        shortDescription,
        fullDescription,
        ingredients,
        preparation,
        yieldTotal,
        prepTime,
        cookTime,
        restTime,
        difficulty,
        tools,
        notes,
        metaTitle,
        metaDescription,
        keywords,
        relatedRecipeIds,
        active,
        categoryId,
        imageUpload,
      } = req.body;
      const recipeCreateDataModel = new RecipeRecipesCreateDataModel(
        name,
        shortDescription,
        fullDescription,
        ingredients,
        preparation,
        yieldTotal,
        prepTime,
        cookTime,
        restTime,
        difficulty,
        tools,
        notes,
        metaTitle,
        metaDescription,
        keywords,
        relatedRecipeIds,
        active,
        categoryId,
        imageUpload
      );
      const recipe = await this.recipeCreate.executeNewAsync(
        recipeCreateDataModel,
        company
      );
      res.status(201).json(recipe);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const {
        id,
        slug,
        name,
        shortDescription,
        fullDescription,
        ingredients,
        preparation,
        yieldTotal,
        prepTime,
        cookTime,
        restTime,
        difficulty,
        tools,
        notes,
        metaTitle,
        metaDescription,
        keywords,
        relatedRecipeIds,
        imageUrl,
        active,
        categoryId,
        imageUpload,
      } = req.body;
      const recipeUpdateDataModel = new RecipeRecipesUpdateDataModel(
        id,
        slug,
        name,
        shortDescription,
        fullDescription,
        ingredients,
        preparation,
        yieldTotal,
        prepTime,
        cookTime,
        restTime,
        difficulty,
        tools,
        notes,
        metaTitle,
        metaDescription,
        keywords,
        relatedRecipeIds,
        imageUrl,
        active,
        categoryId,
        imageUpload
      );
      const recipe = await this.recipeUpdate.executeNewAsync(
        recipeUpdateDataModel,
        company
      );
      res.json(recipe);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const recipe = await this.recipeDelete.executeNewAsync(id, company);
      res.json(recipe);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private deleteImageAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      await this.recipeDeleteImage.executeAsync(id, company);
      res.json();
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };
}

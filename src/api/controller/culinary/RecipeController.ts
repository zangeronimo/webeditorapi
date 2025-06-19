import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  GetAllRecipeFilterModel,
  RecipeCreateDataModel,
  RecipeUpdateDataModel,
} from "@application/model/culinary/recipe";
import {
  RecipeGetAll,
  RecipeGetById,
  RecipeCreate,
  RecipeUpdate,
  RecipeDelete,
} from "@application/usecase/culinary/recipe";
import { RecipeDeleteImage } from "@application/usecase/culinary/recipe/RecipeDeleteImage";
import { Image } from "@domain/entity/culinary";
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
      const recipes = await this.recipeGetAll.executeAsync(
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
      const recipe = await this.recipeGetById.executeAsync(id, company);
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
        ingredients,
        preparation,
        moreInformation,
        active,
        categoryId,
        imageUpload,
      } = req.body;
      const recipeCreateDataModel = new RecipeCreateDataModel(
        name,
        ingredients,
        preparation,
        moreInformation,
        active,
        categoryId,
        imageUpload
      );
      const recipe = await this.recipeCreate.executeAsync(
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
        ingredients,
        preparation,
        moreInformation,
        images,
        active,
        categoryId,
        imageUpload,
      } = req.body;
      const recipeImages = images.map((img: any) =>
        Image.restore(
          img.id,
          img.url,
          img.recipeId,
          img.active,
          company,
          img.createdAt,
          img.updatedAt
        )
      );
      const recipeUpdateDataModel = new RecipeUpdateDataModel(
        id,
        slug,
        name,
        ingredients,
        preparation,
        moreInformation,
        active,
        categoryId,
        imageUpload,
        recipeImages
      );
      const recipe = await this.recipeUpdate.executeAsync(
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
      const recipe = await this.recipeDelete.executeAsync(id, company);
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

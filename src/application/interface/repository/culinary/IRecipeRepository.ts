import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import { GetAllRecipesFilterModel } from "@application/model/culinary/recipe/GetAllRecipesFilterModel";
import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { Image, Recipe } from "@domain/entity/culinary";

export interface IRecipeRepository {
  getByIdAsync(id: string, company: string): Promise<Recipe | null>;
  getBySlugAsync(slug: string, company: string): Promise<Recipe | null>;
  getAllAsync(
    model: GetAllRecipeFilterModel,
    company: string
  ): Promise<{ itens: Recipe[]; total: number }>;
  updateAsync(recipe: Recipe): Promise<Recipe>;
  saveAsync(recipe: Recipe): Promise<Recipe>;
  deleteAsync(recipe: Recipe, date: Date): Promise<Recipe>;
  deleteImageAsync(image: Image, date: Date): Promise<void>;

  getRecipesAsync(
    model: GetAllRecipesFilterModel,
    company: string
  ): Promise<Recipe[]>;
  getWithImageAsync(
    model: GetAllWithImageFilterModel,
    company: string
  ): Promise<Recipe[]>;
  getAllActiveImagesByRecipeId(
    recipeId: string,
    company: string
  ): Promise<string[]>;
  getAllByCategory(categoryId: string, company: string): Promise<Recipe[]>;
  getImageByIdAsync(id: string, company: string): Promise<Image | null>;
}

import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import { GetAllRecipesFilterModel } from "@application/model/culinary/recipe/GetAllRecipesFilterModel";
import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { Image } from "@domain/entity/culinary";
import { RecipeRecipes } from "@domain/entity/culinary/RecipeRecipes";

export interface IRecipeRecipesRepository {
  getByIdAsync(id: string, company: string): Promise<RecipeRecipes | null>;
  getBySlugAsync(slug: string, company: string): Promise<RecipeRecipes | null>;
  getAllAsync(
    model: GetAllRecipeFilterModel,
    company: string
  ): Promise<{ itens: RecipeRecipes[]; total: number }>;
  updateAsync(recipe: RecipeRecipes): Promise<RecipeRecipes>;
  saveAsync(recipe: RecipeRecipes): Promise<RecipeRecipes>;
  deleteAsync(recipe: RecipeRecipes, date: Date): Promise<RecipeRecipes>;
  deleteImageAsync(image: Image, date: Date): Promise<void>;

  getRecipesAsync(
    model: GetAllRecipesFilterModel,
    company: string
  ): Promise<RecipeRecipes[]>;
  getWithImageAsync(
    model: GetAllWithImageFilterModel,
    company: string
  ): Promise<RecipeRecipes[]>;
  getAllActiveImagesByRecipeId(
    recipeId: string,
    company: string
  ): Promise<string[]>;
  getAllByCategory(
    categoryId: string,
    company: string
  ): Promise<RecipeRecipes[]>;
  getImageByIdAsync(id: string, company: string): Promise<Image | null>;
}

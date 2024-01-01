import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { Recipe } from "@domain/entity/culinary";

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

  getNewsAsync(total: number, company: string): Promise<Recipe[]>;
  getWithImageAsync(
    model: GetAllWithImageFilterModel,
    company: string
  ): Promise<Recipe[]>;
  getAllImagesByRecipeId(recipeId: string, company: string): Promise<string[]>;
  getAllByCategory(categoryId: string, company: string): Promise<Recipe[]>;
}

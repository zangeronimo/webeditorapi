import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
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
}

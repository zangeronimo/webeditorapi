import { GetAllRecipesFilterModel } from "@application/model/culinary/recipe/GetAllRecipesFilterModel";
import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { RecipeDto } from "@domain/dto/culinary";

export interface IRecipeService {
  getRecipesAsync(
    model: GetAllRecipesFilterModel,
    company: string
  ): Promise<RecipeDto[]>;
  getWithImageAsync(
    model: GetAllWithImageFilterModel,
    company: string
  ): Promise<RecipeDto[]>;
  getBySlugAsync(slug: string, company: string): Promise<RecipeDto>;
}

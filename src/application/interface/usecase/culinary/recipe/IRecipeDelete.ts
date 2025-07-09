import { RecipeDto } from "@domain/dto/culinary";
import { RecipeRecipesDto } from "@domain/dto/culinary/RecipeRecipesDto";

export interface IRecipeDelete {
  executeAsync(id: string, company: string): Promise<RecipeDto>;
  executeNewAsync(id: string, company: string): Promise<RecipeRecipesDto>;
}

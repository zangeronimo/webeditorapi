import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import { RecipeDto } from "@domain/dto/culinary";
import { RecipeRecipesDto } from "@domain/dto/culinary/RecipeRecipesDto";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IRecipeGetAll {
  executeAsync(
    model: GetAllRecipeFilterModel,
    company: string
  ): Promise<PaginatorResultDto<RecipeDto[]>>;
  executeNewAsync(
    model: GetAllRecipeFilterModel,
    company: string
  ): Promise<PaginatorResultDto<RecipeRecipesDto[]>>;
}

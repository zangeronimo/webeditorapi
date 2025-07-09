import { RecipeUpdateDataModel } from "@application/model/culinary/recipe";
import { RecipeRecipesUpdateDataModel } from "@application/model/culinary/recipe/RecipeRecipesUpdateModel";
import { RecipeDto } from "@domain/dto/culinary";
import { RecipeRecipesDto } from "@domain/dto/culinary/RecipeRecipesDto";

export interface IRecipeUpdate {
  executeAsync(
    recipeData: RecipeUpdateDataModel,
    company: string
  ): Promise<RecipeDto>;
  executeNewAsync(
    recipeData: RecipeRecipesUpdateDataModel,
    company: string
  ): Promise<RecipeRecipesDto>;
}

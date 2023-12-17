import { RecipeUpdateDataModel } from "@application/model/culinary/recipe";
import { RecipeDto } from "@domain/dto/culinary";

export interface IRecipeUpdate {
  executeAsync(
    recipeData: RecipeUpdateDataModel,
    company: string
  ): Promise<RecipeDto>;
}

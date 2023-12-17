import { RecipeCreateDataModel } from "@application/model/culinary/recipe";
import { RecipeDto } from "@domain/dto/culinary";

export interface IRecipeCreate {
  executeAsync(
    recipeData: RecipeCreateDataModel,
    company: string
  ): Promise<RecipeDto>;
}

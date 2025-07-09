import { RecipeCreateDataModel } from "@application/model/culinary/recipe";
import { RecipeRecipesCreateDataModel } from "@application/model/culinary/recipe/RecipeRecipesCreateModel";
import { RecipeDto } from "@domain/dto/culinary";
import { RecipeRecipesDto } from "@domain/dto/culinary/RecipeRecipesDto";

export interface IRecipeCreate {
  executeAsync(
    recipeData: RecipeCreateDataModel,
    company: string
  ): Promise<RecipeDto>;
  executeNewAsync(
    recipeData: RecipeRecipesCreateDataModel,
    company: string
  ): Promise<RecipeRecipesDto>;
}

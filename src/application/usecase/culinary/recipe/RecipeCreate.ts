import { IRecipeRepository } from "@application/interface/repository/culinary";
import { IRecipeRecipesRepository } from "@application/interface/repository/culinary/IRecipeRecipesRepository";
import { IRecipeCreate } from "@application/interface/usecase/culinary/recipe";
import { Messages } from "@application/messages/Messages";
import { RecipeCreateDataModel } from "@application/model/culinary/recipe";
import { RecipeRecipesCreateDataModel } from "@application/model/culinary/recipe/RecipeRecipesCreateModel";
import { RecipeDto } from "@domain/dto/culinary";
import { RecipeRecipesDto } from "@domain/dto/culinary/RecipeRecipesDto";
import { Recipe } from "@domain/entity/culinary";
import { RecipeRecipes } from "@domain/entity/culinary/RecipeRecipes";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeCreate implements IRecipeCreate {
  constructor(
    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository,
    @inject("IRecipeRecipesRepository")
    readonly _recipeNewRepository: IRecipeRecipesRepository
  ) {}

  async executeAsync(recipeData: RecipeCreateDataModel, company: string) {
    const recipe = Recipe.create(recipeData, company);
    if (recipe === null) {
      throw new Error(Messages.notCreated("Recipe"));
    }
    const slugExists = await this._recipeRepository.getBySlugAsync(
      recipe.slug!,
      company
    );
    if (slugExists !== null) {
      throw new Error(Messages.alreadyInUse("Slug"));
    }
    await this._recipeRepository.saveAsync(recipe);
    return new RecipeDto(recipe);
  }

  async executeNewAsync(
    recipeData: RecipeRecipesCreateDataModel,
    company: string
  ) {
    const recipe = RecipeRecipes.create(recipeData, company);
    if (recipe === null) {
      throw new Error(Messages.notCreated("Recipe"));
    }
    const slugExists = await this._recipeNewRepository.getBySlugAsync(
      recipe.slug!,
      company
    );
    if (slugExists !== null) {
      throw new Error(Messages.alreadyInUse("Slug"));
    }
    await this._recipeNewRepository.saveAsync(recipe);
    return new RecipeRecipesDto(recipe);
  }
}

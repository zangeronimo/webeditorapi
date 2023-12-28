import { IRecipeRepository } from "@application/interface/repository/culinary";
import { IRecipeCreate } from "@application/interface/usecase/culinary/recipe";
import { Messages } from "@application/messages/Messages";
import { RecipeCreateDataModel } from "@application/model/culinary/recipe";
import { RecipeDto } from "@domain/dto/culinary";
import { Recipe } from "@domain/entity/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeCreate implements IRecipeCreate {
  constructor(
    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository,
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
}

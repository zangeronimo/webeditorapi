import { IRecipeRepository } from "@application/interface/repository/culinary";
import { IRecipeRecipesRepository } from "@application/interface/repository/culinary/IRecipeRecipesRepository";
import { IRecipeDelete } from "@application/interface/usecase/culinary/recipe";
import { Messages } from "@application/messages/Messages";
import { RecipeDto } from "@domain/dto/culinary";
import { RecipeRecipesDto } from "@domain/dto/culinary/RecipeRecipesDto";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeDelete implements IRecipeDelete {
  constructor(
    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository,
    @inject("IRecipeRecipesRepository")
    readonly _recipeNewRepository: IRecipeRecipesRepository
  ) {}

  async executeAsync(id: string, company: string) {
    const recipe = await this._recipeRepository.getByIdAsync(id, company)!;
    if (recipe === null) {
      throw new Error(Messages.notFound("Recipe"));
    }
    await this._recipeRepository.deleteAsync(recipe, new Date());
    return new RecipeDto(recipe);
  }

  async executeNewAsync(id: string, company: string) {
    const recipe = await this._recipeNewRepository.getByIdAsync(id, company)!;
    if (recipe === null) {
      throw new Error(Messages.notFound("Recipe"));
    }
    await this._recipeNewRepository.deleteAsync(recipe, new Date());
    return new RecipeRecipesDto(recipe);
  }
}

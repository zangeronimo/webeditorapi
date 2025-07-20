import { IRatingRecipesRepository } from "@application/interface/repository/culinary/IRatingRecipesRepository";
import { IRecipeRecipesRepository } from "@application/interface/repository/culinary/IRecipeRecipesRepository";
import { IRatingGetById } from "@application/interface/usecase/culinary/ratingRecipes";
import { Messages } from "@application/messages/Messages";
import { RatingRecipesDto } from "@domain/dto/culinary/RatingRecipesDto";
import { RecipeRecipesDto } from "@domain/dto/culinary/RecipeRecipesDto";
import { inject, injectable } from "tsyringe";

@injectable()
export class RatingGetById implements IRatingGetById {
  constructor(
    @inject("IRatingRecipesRepository")
    readonly _ratingRepository: IRatingRecipesRepository,
    @inject("IRecipeRecipesRepository")
    readonly _recipeRepository: IRecipeRecipesRepository
  ) {}

  async executeAsync(id: string, company: string) {
    const rating = await this._ratingRepository.getByIdAsync(id, company)!;
    if (rating === null) {
      throw new Error(Messages.notFound("Rating"));
    }
    const recipe = await this._recipeRepository.getByIdAsync(
      rating.recipeId,
      company
    );
    return new RatingRecipesDto(rating, new RecipeRecipesDto(recipe!));
  }
}

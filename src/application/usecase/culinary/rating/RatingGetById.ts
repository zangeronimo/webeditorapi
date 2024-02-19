import {
  IRatingRepository,
  IRecipeRepository,
} from "@application/interface/repository/culinary";
import { IRatingGetById } from "@application/interface/usecase/culinary/rating";
import { Messages } from "@application/messages/Messages";
import { RatingDto, RecipeDto } from "@domain/dto/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RatingGetById implements IRatingGetById {
  constructor(
    @inject("IRatingRepository")
    readonly _ratingRepository: IRatingRepository,
    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository
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
    return new RatingDto(rating, new RecipeDto(recipe!));
  }
}

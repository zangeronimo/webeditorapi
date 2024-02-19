import {
  IRatingRepository,
  IRecipeRepository,
} from "@application/interface/repository/culinary";
import { IRatingGetAll } from "@application/interface/usecase/culinary/rating";
import { GetAllRatingFilterModel } from "@application/model/culinary/rating";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { RatingDto, RecipeDto } from "@domain/dto/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RatingGetAll implements IRatingGetAll {
  constructor(
    @inject("IRatingRepository")
    readonly _ratingRepository: IRatingRepository,

    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository
  ) {}

  async executeAsync(model: GetAllRatingFilterModel, company: string) {
    const { itens: ratings, total } = await this._ratingRepository.getAllAsync(
      model,
      company
    )!;
    const ratingsDto: RatingDto[] = [];
    for (let i = 0; i < ratings.length; i++) {
      const rating = ratings[i];
      const recipe = await this._recipeRepository.getByIdAsync(
        rating.recipeId,
        company
      );
      const ratingDto = new RatingDto(rating, new RecipeDto(recipe!));
      ratingsDto.push(ratingDto);
    }
    return new PaginatorResultDto(ratingsDto, total);
  }
}

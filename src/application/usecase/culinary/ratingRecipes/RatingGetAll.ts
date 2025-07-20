import { IRatingRecipesRepository } from "@application/interface/repository/culinary/IRatingRecipesRepository";
import { IRecipeRecipesRepository } from "@application/interface/repository/culinary/IRecipeRecipesRepository";
import { IRatingGetAll } from "@application/interface/usecase/culinary/ratingRecipes";
import { GetAllRatingFilterModel } from "@application/model/culinary/rating";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { RatingRecipesDto } from "@domain/dto/culinary/RatingRecipesDto";
import { RecipeRecipesDto } from "@domain/dto/culinary/RecipeRecipesDto";
import { inject, injectable } from "tsyringe";

@injectable()
export class RatingGetAll implements IRatingGetAll {
  constructor(
    @inject("IRatingRecipesRepository")
    readonly _ratingRepository: IRatingRecipesRepository,

    @inject("IRecipeRecipesRepository")
    readonly _recipeRepository: IRecipeRecipesRepository
  ) {}

  async executeAsync(model: GetAllRatingFilterModel, company: string) {
    const { itens: ratings, total } = await this._ratingRepository.getAllAsync(
      model,
      company
    )!;
    const ratingsDto: RatingRecipesDto[] = [];
    for (let i = 0; i < ratings.length; i++) {
      const rating = ratings[i];
      const recipe = await this._recipeRepository.getByIdAsync(
        rating.recipeId,
        company
      );
      const ratingDto = new RatingRecipesDto(
        rating,
        new RecipeRecipesDto(recipe!)
      );
      ratingsDto.push(ratingDto);
    }
    return new PaginatorResultDto(ratingsDto, total);
  }
}

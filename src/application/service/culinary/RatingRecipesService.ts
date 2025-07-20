import { IRatingRecipesRepository } from "@application/interface/repository/culinary/IRatingRecipesRepository";
import { IRatingRecipesService } from "@application/interface/service/culinary/IRatingRecipesService";
import { RatingCreateDataModel } from "@application/model/culinary/rating";
import { RatingRecipesDto } from "@domain/dto/culinary/RatingRecipesDto";
import { Rating } from "@domain/entity/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RatingRecipesService implements IRatingRecipesService {
  constructor(
    @inject("IRatingRecipesRepository")
    readonly _ratingRepository: IRatingRecipesRepository
  ) {}

  async getAllByRecipeAsync(
    recipeId: string,
    company: string
  ): Promise<RatingRecipesDto[]> {
    const ratings = await this._ratingRepository.getAllByRecipeAsync(
      recipeId,
      company
    );
    return ratings.map((rating: Rating) => new RatingRecipesDto(rating));
  }

  async createAsync(
    model: RatingCreateDataModel,
    company: string
  ): Promise<void> {
    const rating = Rating.create(model, company);
    await this._ratingRepository.saveAsync(rating);
  }
}

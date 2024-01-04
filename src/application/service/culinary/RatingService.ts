import { IRatingRepository } from "@application/interface/repository/culinary";
import { IRatingService } from "@application/interface/service/culinary/IRatingService";
import { RatingDto } from "@domain/dto/culinary";
import { Rating } from "@domain/entity/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RatingService implements IRatingService {
  constructor(
    @inject("IRatingRepository")
    readonly _ratingRepository: IRatingRepository
  ) {}

  async getAllByRecipeAsync(
    recipeId: string,
    company: string
  ): Promise<RatingDto[]> {
    const ratings = await this._ratingRepository.getAllByRecipeAsync(
      recipeId,
      company
    );
    return ratings.map((rating: Rating) => {
      return new RatingDto(rating);
    });
  }
}

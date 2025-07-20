import { IRatingRecipesRepository } from "@application/interface/repository/culinary/IRatingRecipesRepository";
import { IRatingCreate } from "@application/interface/usecase/culinary/ratingRecipes";
import { Messages } from "@application/messages/Messages";
import { RatingCreateDataModel } from "@application/model/culinary/rating";
import { RatingRecipesDto } from "@domain/dto/culinary/RatingRecipesDto";
import { Rating } from "@domain/entity/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RatingCreate implements IRatingCreate {
  constructor(
    @inject("IRatingRecipesRepository")
    readonly _ratingRepository: IRatingRecipesRepository
  ) {}

  async executeAsync(ratingData: RatingCreateDataModel, company: string) {
    const rating = Rating.create(ratingData, company);
    if (rating === null) {
      throw new Error(Messages.notCreated("Rating"));
    }
    await this._ratingRepository.saveAsync(rating);
    return new RatingRecipesDto(rating);
  }
}

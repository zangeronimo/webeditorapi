import { IRatingRecipesRepository } from "@application/interface/repository/culinary/IRatingRecipesRepository";
import { IRatingUpdate } from "@application/interface/usecase/culinary/ratingRecipes";
import { Messages } from "@application/messages/Messages";
import { RatingUpdateDataModel } from "@application/model/culinary/rating";
import { RatingRecipesDto } from "@domain/dto/culinary/RatingRecipesDto";
import { inject, injectable } from "tsyringe";

@injectable()
export class RatingUpdate implements IRatingUpdate {
  constructor(
    @inject("IRatingRecipesRepository")
    readonly _ratingRepository: IRatingRecipesRepository
  ) {}

  async executeAsync(ratingData: RatingUpdateDataModel, company: string) {
    const rating = await this._ratingRepository.getByIdAsync(
      ratingData.id,
      company
    )!;
    if (rating === null) {
      throw new Error(Messages.notFound("Rating"));
    }
    rating.update(ratingData);
    await this._ratingRepository.updateAsync(rating);
    return new RatingRecipesDto(rating);
  }
}

import { IRatingRepository } from "@application/interface/repository/culinary";
import { IRatingUpdate } from "@application/interface/usecase/culinary/rating";
import { Messages } from "@application/messages/Messages";
import { RatingUpdateDataModel } from "@application/model/culinary/rating";
import { RatingDto } from "@domain/dto/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RatingUpdate implements IRatingUpdate {
  constructor(
    @inject("IRatingRepository")
    readonly _ratingRepository: IRatingRepository,
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
    return new RatingDto(rating);
  }
}

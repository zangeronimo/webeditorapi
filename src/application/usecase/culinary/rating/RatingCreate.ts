import { IRatingRepository } from "@application/interface/repository/culinary";
import { IRatingCreate } from "@application/interface/usecase/culinary/rating";
import { Messages } from "@application/messages/Messages";
import { RatingCreateDataModel } from "@application/model/culinary/rating";
import { RatingDto } from "@domain/dto/culinary";
import { Rating } from "@domain/entity/culinary";
import { inject } from "@infra/di/Inject";

export class RatingCreate implements IRatingCreate {
  @inject("IRatingRepository")
  _ratingRepository?: IRatingRepository;

  async executeAsync(ratingData: RatingCreateDataModel, company: string) {
    const rating = Rating.create(ratingData, company);
    if (rating === null) {
      throw new Error(Messages.notCreated("Rating"));
    }
    await this._ratingRepository?.saveAsync(rating);
    return new RatingDto(rating);
  }
}

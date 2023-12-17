import { IRatingRepository } from "@application/interface/repository/culinary";
import { IRatingDelete } from "@application/interface/usecase/culinary/rating";
import { Messages } from "@application/messages/Messages";
import { RatingDto } from "@domain/dto/culinary";
import { inject } from "@infra/di/Inject";

export class RatingDelete implements IRatingDelete {
  @inject("IRatingRepository")
  _ratingRepository?: IRatingRepository;

  async executeAsync(id: string, company: string) {
    const rating = await this._ratingRepository?.getByIdAsync(id, company)!;
    if (rating === null) {
      throw new Error(Messages.notFound("Rating"));
    }
    await this._ratingRepository?.deleteAsync(rating, new Date());
    return new RatingDto(rating);
  }
}

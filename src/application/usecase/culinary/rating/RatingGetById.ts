import { IRatingRepository } from "@application/interface/repository/culinary";
import { IRatingGetById } from "@application/interface/usecase/culinary/rating";
import { Messages } from "@application/messages/Messages";
import { RatingDto } from "@domain/dto/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RatingGetById implements IRatingGetById {
  constructor(
    @inject("IRatingRepository")
    readonly _ratingRepository: IRatingRepository,
  ) {}

  async executeAsync(id: string, company: string) {
    const rating = await this._ratingRepository.getByIdAsync(id, company)!;
    if (rating === null) {
      throw new Error(Messages.notFound("Rating"));
    }
    return new RatingDto(rating);
  }
}

import { IRatingRepository } from "@application/interface/repository/culinary";
import { IRatingGetAll } from "@application/interface/usecase/culinary/rating";
import { GetAllRatingFilterModel } from "@application/model/culinary/rating";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { RatingDto } from "@domain/dto/culinary";
import { Rating } from "@domain/entity/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RatingGetAll implements IRatingGetAll {
  constructor(
    @inject("IRatingRepository")
    readonly _ratingRepository: IRatingRepository,
  ) {}

  async executeAsync(model: GetAllRatingFilterModel, company: string) {
    const { itens: ratings, total } = await this._ratingRepository.getAllAsync(
      model,
      company
    )!;
    const ratingsDto = ratings.map((rating: Rating) => new RatingDto(rating));
    return new PaginatorResultDto(ratingsDto, total);
  }
}

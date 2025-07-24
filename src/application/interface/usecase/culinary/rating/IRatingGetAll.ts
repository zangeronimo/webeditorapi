import { GetAllRatingFilterModel } from "@application/model/culinary/rating";
import { RatingDto } from "@domain/dto/culinary";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IRatingGetAll {
  executeAsync(
    model: GetAllRatingFilterModel,
    company: string
  ): Promise<PaginatorResultDto<RatingDto[]>>;
}

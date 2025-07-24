import { GetAllRatingFilterModel } from "@application/model/culinary/rating";
import { RatingRecipesDto } from "@domain/dto/culinary/RatingRecipesDto";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IRatingGetAll {
  executeAsync(
    model: GetAllRatingFilterModel,
    company: string
  ): Promise<PaginatorResultDto<RatingRecipesDto[]>>;
}

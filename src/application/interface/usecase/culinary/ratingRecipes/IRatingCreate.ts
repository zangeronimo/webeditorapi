import { RatingCreateDataModel } from "@application/model/culinary/rating";
import { RatingRecipesDto } from "@domain/dto/culinary/RatingRecipesDto";

export interface IRatingCreate {
  executeAsync(
    ratingData: RatingCreateDataModel,
    company: string
  ): Promise<RatingRecipesDto>;
}

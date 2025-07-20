import { RatingUpdateDataModel } from "@application/model/culinary/rating";
import { RatingRecipesDto } from "@domain/dto/culinary/RatingRecipesDto";

export interface IRatingUpdate {
  executeAsync(
    ratingData: RatingUpdateDataModel,
    company: string
  ): Promise<RatingRecipesDto>;
}

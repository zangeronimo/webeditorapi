import { RatingUpdateDataModel } from "@application/model/culinary/rating";
import { RatingDto } from "@domain/dto/culinary";

export interface IRatingUpdate {
  executeAsync(
    ratingData: RatingUpdateDataModel,
    company: string
  ): Promise<RatingDto>;
}

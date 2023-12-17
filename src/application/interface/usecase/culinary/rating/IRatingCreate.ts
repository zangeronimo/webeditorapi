import { RatingCreateDataModel } from "@application/model/culinary/rating";
import { RatingDto } from "@domain/dto/culinary";

export interface IRatingCreate {
  executeAsync(
    ratingData: RatingCreateDataModel,
    company: string
  ): Promise<RatingDto>;
}

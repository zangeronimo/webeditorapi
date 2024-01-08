import { RatingCreateDataModel } from "@application/model/culinary/rating";
import { RatingDto } from "@domain/dto/culinary";

export interface IRatingService {
  getAllByRecipeAsync(recipeId: string, company: string): Promise<RatingDto[]>;
  createAsync(model: RatingCreateDataModel, company: string): Promise<void>;
}

import { RatingCreateDataModel } from "@application/model/culinary/rating";
import { RatingRecipesDto } from "@domain/dto/culinary/RatingRecipesDto";

export interface IRatingRecipesService {
  getAllByRecipeAsync(
    recipeId: string,
    company: string
  ): Promise<RatingRecipesDto[]>;
  createAsync(model: RatingCreateDataModel, company: string): Promise<void>;
}

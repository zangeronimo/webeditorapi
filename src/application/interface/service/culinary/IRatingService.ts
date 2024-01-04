import { RatingDto } from "@domain/dto/culinary";

export interface IRatingService {
  getAllByRecipeAsync(recipeId: string, company: string): Promise<RatingDto[]>;
}

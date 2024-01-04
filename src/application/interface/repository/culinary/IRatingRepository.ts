import { GetAllRatingFilterModel } from "@application/model/culinary/rating";
import { Rating } from "@domain/entity/culinary";

export interface IRatingRepository {
  getByIdAsync(id: string, company: string): Promise<Rating | null>;
  getAllAsync(
    model: GetAllRatingFilterModel,
    company: string
  ): Promise<{ itens: Rating[]; total: number }>;
  updateAsync(rating: Rating): Promise<Rating>;
  saveAsync(rating: Rating): Promise<Rating>;
  deleteAsync(rating: Rating, date: Date): Promise<Rating>;
  getAllByRecipeAsync(recipeId: string, company: string): Promise<Rating[]>;
}

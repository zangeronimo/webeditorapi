import { RatingRecipesDto } from "@domain/dto/culinary/RatingRecipesDto";

export interface IRatingDelete {
  executeAsync(id: string, company: string): Promise<RatingRecipesDto>;
}

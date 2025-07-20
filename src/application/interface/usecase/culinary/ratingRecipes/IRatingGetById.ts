import { RatingRecipesDto } from "@domain/dto/culinary/RatingRecipesDto";

export interface IRatingGetById {
  executeAsync(id: string, company: string): Promise<RatingRecipesDto>;
}

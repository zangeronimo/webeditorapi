import { RatingDto } from "@domain/dto/culinary";

export interface IRatingDelete {
  executeAsync(id: string, company: string): Promise<RatingDto>;
}

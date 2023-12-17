import { RatingDto } from "@domain/dto/culinary";

export interface IRatingGetById {
  executeAsync(id: string, company: string): Promise<RatingDto>;
}

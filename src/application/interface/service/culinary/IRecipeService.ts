import { RecipeDto } from "@domain/dto/culinary";

export interface IRecipeService {
  getNewsAsync(total: number, company: string): Promise<RecipeDto[]>;
  getWithImageAsync(total: number, company: string): Promise<RecipeDto[]>;
  getByIdAsync(id: string, company: string): Promise<RecipeDto>;
}

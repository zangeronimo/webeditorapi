import { RecipeDto } from "@domain/dto/culinary";

export interface IRecipeDeleteImage {
  executeAsync(id: string, company: string): Promise<void>;
}

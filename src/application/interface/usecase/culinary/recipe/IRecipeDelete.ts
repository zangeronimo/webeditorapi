import { RecipeDto } from "@domain/dto/culinary";

export interface IRecipeDelete {
  executeAsync(id: string, company: string): Promise<RecipeDto>;
}

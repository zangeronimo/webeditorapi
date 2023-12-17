import { RecipeDto } from "@domain/dto/culinary";

export interface IRecipeGetById {
  executeAsync(id: string, company: string): Promise<RecipeDto>;
}

import { RecipeWithImagesDto } from "@domain/dto/web/culinary/RecipeWithImagesDto";

export interface IRecipeDao {
  getWithImageAsync(
    total: number,
    company: string
  ): Promise<RecipeWithImagesDto[]>;
}

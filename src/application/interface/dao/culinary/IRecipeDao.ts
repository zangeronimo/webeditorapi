import { RecipeGetAllDao } from "@application/model/web/culinary/RecipeGetAllDao";
import { RecipeWithImagesDto } from "@domain/dto/web/culinary/RecipeWithImagesDto";

export interface IRecipeDao {
  getAllAsync(
    model: RecipeGetAllDao,
    company: string
  ): Promise<RecipeWithImagesDto[]>;
}

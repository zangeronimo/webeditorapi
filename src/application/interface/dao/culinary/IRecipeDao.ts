import { RecipeGetBySearchDao } from "@application/model/web/culinary/RecipeBySearchDao";
import { RecipeGetAllDao } from "@application/model/web/culinary/RecipeGetAllDao";
import { RecipeDto } from "@domain/dto/web/culinary/RecipeDto";
import { RecipeWithImagesDto } from "@domain/dto/web/culinary/RecipeWithImagesDto";
import { Slug } from "@domain/valueObject/Slug";

export interface IRecipeDao {
  getAllAsync(
    model: RecipeGetAllDao,
    company: string
  ): Promise<RecipeWithImagesDto[]>;
  getBySlugAsync(slug: Slug, company: string): Promise<RecipeDto | null>;
  getByIdAsync(id: string, company: string): Promise<RecipeDto | null>;
  updateAsync(id: string, views: number, company: string): Promise<void>;
  getByLevelSlugAsync(level: Slug, company: string): Promise<RecipeDto[]>;
  getBySearchAsync(
    model: RecipeGetBySearchDao,
    company: string
  ): Promise<RecipeDto[]>;
  getMostAccessedAsync(company: string): Promise<RecipeDto[]>;
}

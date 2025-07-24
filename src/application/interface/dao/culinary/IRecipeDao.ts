import { RecipeGetBySearchModel } from "@application/model/web/culinary/RecipeBySearchModel";
import { RecipeGetAllModel } from "@application/model/web/culinary/RecipeGetAllModel";
import { RecipeMostAccessedModel } from "@application/model/web/culinary/RecipeMostAccessedModel";
import { RatingDto } from "@domain/dto/web/culinary/RatingDto";
import { RecipeDto } from "@domain/dto/web/culinary/RecipeDto";
import { RecipeWithImagesDto } from "@domain/dto/web/culinary/RecipeWithImagesDto";
import { SitemapDto } from "@domain/dto/web/culinary/SitemapDto";
import { Slug } from "@domain/valueObject/Slug";

export interface IRecipeDao {
  getAllAsync(
    model: RecipeGetAllModel,
    company: string
  ): Promise<RecipeWithImagesDto[]>;
  getBySlugAsync(slug: Slug, company: string): Promise<RecipeDto | null>;
  getByIdAsync(id: string, company: string): Promise<RecipeDto | null>;
  updateAsync(recipe: RecipeDto, company: string): Promise<void>;
  getByLevelSlugAsync(level: Slug, company: string): Promise<RecipeDto[]>;
  getBySearchAsync(
    model: RecipeGetBySearchModel,
    company: string
  ): Promise<RecipeDto[]>;
  getMostAccessedAsync(
    model: RecipeMostAccessedModel,
    company: string
  ): Promise<{ itens: RecipeDto[]; total: number }>;
  getSitemapAsync(company: string): Promise<SitemapDto[]>;
  commentRecipeAsync(
    recipeId: string,
    name: string,
    comment: string,
    rate: number,
    company: string
  ): Promise<RatingDto>;
}

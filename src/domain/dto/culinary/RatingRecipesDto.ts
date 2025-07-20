import { Rating } from "@domain/entity/culinary";
import { DtoBase } from "../DtoBase";
import { RecipeRecipesDto } from "./RecipeRecipesDto";

export class RatingRecipesDto extends DtoBase {
  rate: number;
  comment: string;
  active: number;
  recipeId: string;
  name?: string;
  recipe?: RecipeRecipesDto;

  constructor(rating: Rating, recipe?: RecipeRecipesDto) {
    super(rating.id, rating.createdAt, rating.updatedAt);
    this.rate = rating?.rate;
    this.comment = rating?.comment;
    this.active = rating?.active.valueOf();
    this.recipeId = rating?.recipeId;
    this.name = rating?.name;
    this.recipe = recipe;
  }
}

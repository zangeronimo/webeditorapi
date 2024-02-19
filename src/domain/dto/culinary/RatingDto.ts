import { Rating } from "@domain/entity/culinary";
import { DtoBase } from "../DtoBase";
import { RecipeDto } from "./RecipeDto";

export class RatingDto extends DtoBase {
  rate: number;
  comment: string;
  active: number;
  recipeId: string;
  name?: string;
  recipe?: RecipeDto;

  constructor(rating: Rating, recipe?: RecipeDto) {
    super(rating.id, rating.createdAt, rating.updatedAt);
    this.rate = rating?.rate;
    this.comment = rating?.comment;
    this.active = rating?.active.valueOf();
    this.recipeId = rating?.recipeId;
    this.name = rating?.name;
    this.recipe = recipe;
  }
}

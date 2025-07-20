import { Rating } from "@domain/entity/culinary";

export class RatingDto {
  id: string;
  rate: number;
  comment: string;
  active: number;
  recipeId: string;
  name?: string;

  constructor(rating: any) {
    this.id = rating?.id;
    this.rate = rating?.rate;
    this.comment = rating?.comment;
    this.active = rating?.active;
    this.recipeId = rating?.recipe_recipes_id;
    this.name = rating?.name;
  }
}

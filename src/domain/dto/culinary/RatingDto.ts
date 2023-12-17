import { Rating } from "@domain/entity/culinary";

export class RatingDto {
  id: string;
  rate: number;
  comment: string;
  active: number;
  recipeId: string;
  name?: string;

  constructor(rating: Rating) {
    this.id = rating?.id;
    this.rate = rating?.rate;
    this.comment = rating?.comment;
    this.active = rating?.active.valueOf();
    this.recipeId = rating?.recipeId;
    this.name = rating?.name;
  }
}

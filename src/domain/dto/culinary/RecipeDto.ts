import { Recipe } from "@domain/entity/culinary";
import { RatingDto } from "./RatingDto";
import { CategoryDto } from "./CategoryDto";

export class RecipeDto {
  id: string;
  slug: string;
  name: string;
  ingredients: string;
  preparation: string;
  active: number;
  categoryId: string;
  images: string[];
  ratings: RatingDto[];
  updatedAt?: Date;
  category?: CategoryDto;

  constructor(
    recipe: Recipe,
    images: string[] = [],
    ratings: RatingDto[] = [],
    category?: CategoryDto
  ) {
    this.id = recipe?.id;
    this.slug = recipe?.slug!;
    this.name = recipe?.name;
    this.ingredients = recipe?.ingredients;
    this.preparation = recipe?.preparation;
    this.active = recipe?.active.valueOf();
    this.categoryId = recipe?.categoryId;
    this.updatedAt = recipe?.updatedAt;
    this.images = images;
    this.ratings = ratings;
    this.category = category;
  }

  getRate = (): number | null => {
    if (!this.ratings.length) return null;
    const sumOfRates = this.ratings
      .map((rating) => rating.rate)
      .reduce((rate, total) => total + rate);

    return Math.ceil(sumOfRates / this.ratings.length);
  };
}

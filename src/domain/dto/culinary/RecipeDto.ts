import { Recipe } from "@domain/entity/culinary";
import { RatingDto } from "./RatingDto";
import { CategoryDto } from "./CategoryDto";
import { DtoBase } from "../DtoBase";
import { ImageDto } from "./ImageDto";

export class RecipeDto extends DtoBase {
  slug: string;
  name: string;
  ingredients: string;
  preparation: string;
  moreInformation: string;
  active: number;
  categoryId: string;
  images: ImageDto[];
  ratings: RatingDto[];
  category?: CategoryDto;

  constructor(
    recipe: Recipe,
    images: ImageDto[] = [],
    ratings: RatingDto[] = [],
    category?: CategoryDto
  ) {
    super(recipe?.id, recipe?.createdAt, recipe?.updatedAt);
    this.slug = recipe?.slug!;
    this.name = recipe?.name;
    this.ingredients = recipe?.ingredients;
    this.preparation = recipe?.preparation;
    this.moreInformation = recipe?.moreInformation;
    this.active = recipe?.active.valueOf();
    this.categoryId = recipe?.categoryId;
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

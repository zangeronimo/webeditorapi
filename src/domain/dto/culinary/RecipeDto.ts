import { Recipe } from "@domain/entity/culinary";

export class RecipeDto {
  id: string;
  slug: string;
  name: string;
  ingredients: string;
  preparation: string;
  active: number;
  categoryId: string;
  images: string[];

  constructor(recipe: Recipe, images: string[] = []) {
    this.id = recipe?.id;
    this.slug = recipe?.slug!;
    this.name = recipe?.name;
    this.ingredients = recipe?.ingredients;
    this.preparation = recipe?.preparation;
    this.active = recipe?.active.valueOf();
    this.categoryId = recipe?.categoryId;
    this.images = images;
  }
}

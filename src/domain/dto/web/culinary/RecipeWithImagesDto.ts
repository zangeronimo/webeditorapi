export class RecipeWithImagesDto {
  id: string;
  slug: string;
  name: string;
  ingredients: string;
  preparation: string;
  moreInformation: string;
  images: string[];

  constructor(recipe: any, images: string[] = []) {
    this.id = recipe?.id;
    this.slug = recipe?.slug!;
    this.name = recipe?.name;
    this.ingredients = recipe?.ingredients;
    this.preparation = recipe?.preparation;
    this.moreInformation = recipe?.moreInformation;
    this.images = images;
  }
}

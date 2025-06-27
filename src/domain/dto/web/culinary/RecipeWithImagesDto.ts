export class RecipeWithImagesDto {
  id: string;
  slug: string;
  name: string;
  images: string[];

  constructor(recipe: any, images: string[] = []) {
    this.id = recipe?.id;
    this.slug = recipe?.slug!;
    this.name = recipe?.name;
    this.images = images;
  }
}

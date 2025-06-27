export class RecipeWithImagesDto {
  id: string;
  slug: string;
  name: string;
  rate?: number;
  images: string[];

  constructor(recipe: any, images: string[] = [], rate?: number) {
    this.id = recipe?.id;
    this.slug = recipe?.slug!;
    this.name = recipe?.name;
    this.rate = rate;
    this.images = images;
  }
}

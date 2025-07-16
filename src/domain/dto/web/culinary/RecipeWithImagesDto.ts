export class RecipeWithImagesDto {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  imageUrl: string;

  constructor(recipe: any) {
    this.id = recipe?.id;
    this.slug = recipe?.slug!;
    this.name = recipe?.name;
    this.shortDescription = recipe?.short_description;
    this.imageUrl = recipe?.image_url;
  }
}

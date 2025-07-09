export class RecipeWithImagesDto {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  image_url: string;

  constructor(recipe: any) {
    this.id = recipe?.id;
    this.slug = recipe?.slug!;
    this.name = recipe?.name;
    this.short_description = recipe?.short_description;
    this.image_url = recipe?.image_url;
  }
}

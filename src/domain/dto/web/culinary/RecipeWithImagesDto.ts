export class RecipeWithImagesDto {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
  totalTime: number;
  difficulty: string;

  constructor(recipe: any) {
    this.id = recipe?.id;
    this.slug = recipe?.slug!;
    this.name = recipe?.name;
    this.shortDescription = recipe?.short_description;
    this.imageUrl = recipe?.image_url;
    this.totalTime = recipe?.prep_time + recipe?.cook_time + recipe?.rest_time;
    this.difficulty = recipe?.difficulty;
  }
}

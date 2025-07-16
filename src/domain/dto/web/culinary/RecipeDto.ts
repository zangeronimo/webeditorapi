export class RecipeDto {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  ingredients: string;
  preparation: string;
  yieldTotal: string;
  prepTime: number;
  cookTime: number;
  restTime: number;
  totalTime: number;
  difficulty: string;
  tools: string;
  notes: string;
  imageUrl: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  schemaJsonld: string;
  views: number;
  likes: number;
  publishedAt: string;

  constructor(recipe: any) {
    this.id = recipe?.id;
    this.slug = recipe?.slug!;
    this.name = recipe?.name;
    this.shortDescription = recipe?.short_description;
    this.fullDescription = recipe?.full_description;
    this.ingredients = recipe?.ingredients;
    this.preparation = recipe?.preparation;
    this.yieldTotal = recipe?.yield_total;
    this.prepTime = recipe?.prep_time;
    this.cookTime = recipe?.cook_time;
    this.restTime = recipe?.rest_time;
    this.totalTime = recipe?.prep_time + recipe?.cook_time + recipe?.rest_time;
    this.difficulty = recipe?.difficulty;
    this.tools = recipe?.tools;
    this.notes = recipe?.notes;
    this.imageUrl = recipe?.image_url;
    this.metaTitle = recipe?.meta_title;
    this.metaDescription = recipe?.meta_description;
    this.keywords = recipe?.keywords;
    this.schemaJsonld = JSON.parse(
      JSON.stringify(recipe?.schema_jsonld).replace(/"__/g, '"@')
    );
    this.views = recipe?.views;
    this.likes = recipe?.likes;
    this.publishedAt = new Date(recipe?.published_at).toLocaleDateString(
      "pt-BR"
    );
  }
}

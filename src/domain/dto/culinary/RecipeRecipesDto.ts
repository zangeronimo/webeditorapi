import { RatingDto } from "./RatingDto";
import { CategoryDto } from "./CategoryDto";
import { DtoBase } from "../DtoBase";
import { ImageDto } from "./ImageDto";
import { RecipeRecipes } from "@domain/entity/culinary/RecipeRecipes";

export class RecipeRecipesDto extends DtoBase {
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
  difficulty: string;
  tools: string;
  notes: string;
  imageUrl: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  schmeaJsonld: string;
  relatedRecipeIds: string[];
  views: number;
  likes: number;
  active: number;
  publishedAt?: Date;
  categoryId: string;
  images: ImageDto[];
  ratings: RatingDto[];
  category?: CategoryDto;

  constructor(
    recipe: RecipeRecipes,
    images: ImageDto[] = [],
    ratings: RatingDto[] = [],
    category?: CategoryDto
  ) {
    super(recipe?.id, recipe?.createdAt, recipe?.updatedAt);
    this.slug = recipe?.slug!;
    this.name = recipe?.name;
    this.shortDescription = recipe?.shortDescription;
    this.fullDescription = recipe?.fullDescription;
    this.ingredients = recipe?.ingredients;
    this.preparation = recipe?.preparation;
    this.yieldTotal = recipe?.yieldTotal;
    this.prepTime = recipe?.prepTime;
    this.cookTime = recipe?.cookTime;
    this.restTime = recipe?.restTime;
    this.difficulty = recipe?.difficulty;
    this.tools = recipe?.tools;
    this.notes = recipe?.notes;
    this.imageUrl = recipe?.imageUrl;
    this.metaTitle = recipe?.metaTitle;
    this.metaDescription = recipe?.metaDescription;
    this.keywords = recipe?.keywords;
    this.schmeaJsonld = recipe?.schemaJsonld;
    this.relatedRecipeIds = recipe?.relatedRecipeIds;
    this.views = recipe?.views;
    this.likes = recipe?.likes;
    this.active = recipe?.active.valueOf();
    this.publishedAt = recipe?.publishedAt;
    this.categoryId = recipe?.categoryId;
    this.images = images;
    this.ratings = ratings;
    this.category = category;
  }
}

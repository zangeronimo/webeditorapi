import { ActiveEnum } from "@domain/enum";
import { Slug } from "@domain/valueObject/Slug";
import { EntityBase } from "../EntityBase";
import { Image } from "./Image";
import { RecipeRecipesCreateDataModel } from "@application/model/culinary/recipe/RecipeRecipesCreateModel";
import { RecipeRecipesUpdateDataModel } from "@application/model/culinary/recipe/RecipeRecipesUpdateModel";

export class RecipeRecipes extends EntityBase {
  private _slug: Slug;
  private _name: string;
  private _shortDescription: string;
  private _fullDescription: string;
  private _ingredients: string;
  private _preparation: string;
  private _yieldTotal: string;
  private _prepTime: number;
  private _cookTime: number;
  private _restTime: number;
  private _difficulty: string;
  private _tools: string;
  private _notes: string;
  private _imageUrl: string;
  private _metaTitle: string;
  private _metaDescription: string;
  private _keywords: string[];
  private _schemaJsonld: string;
  private _relatedRecipeIds: string[];
  private _views: number;
  private _likes: number;
  private _active: ActiveEnum;
  private _categoryId: string;
  private _images: Image[];
  private _publishedAt?: Date;

  get slug() {
    return this._slug.value;
  }
  get name() {
    return this._name;
  }
  get shortDescription() {
    return this._shortDescription;
  }
  get fullDescription() {
    return this._fullDescription;
  }
  get ingredients() {
    return this._ingredients;
  }
  get preparation() {
    return this._preparation;
  }
  get yieldTotal() {
    return this._yieldTotal;
  }
  get prepTime() {
    return this._prepTime;
  }
  get cookTime() {
    return this._cookTime;
  }
  get restTime() {
    return this._restTime;
  }
  get difficulty() {
    return this._difficulty;
  }
  get tools() {
    return this._tools;
  }
  get notes() {
    return this._notes;
  }
  get imageUrl() {
    return this._imageUrl;
  }
  get metaTitle() {
    return this._metaTitle;
  }
  get metaDescription() {
    return this._metaDescription;
  }
  get keywords() {
    return this._keywords;
  }
  get schemaJsonld() {
    return this._schemaJsonld;
  }
  get relatedRecipeIds() {
    return this._relatedRecipeIds;
  }
  get views() {
    return this._views;
  }
  get likes() {
    return this._likes;
  }
  get active() {
    return this._active;
  }
  get publishedAt() {
    return this._publishedAt;
  }
  get categoryId() {
    return this._categoryId;
  }
  get images() {
    return this._images;
  }

  private constructor(
    slug: Slug,
    name: string,
    shortDescription: string,
    fullDescription: string,
    ingredients: string,
    preparation: string,
    yieldTotal: string,
    prepTime: number,
    cookTime: number,
    restTime: number,
    difficulty: string,
    tools: string,
    notes: string,
    imageUrl: string,
    metaTitle: string,
    metaDescription: string,
    keywords: string[],
    schemaJsonld: string,
    relatedRecipeIds: string[],
    views: number,
    likes: number,
    active: ActiveEnum,
    images: Image[],
    categoryId: string,
    companyId: string,
    id?: string,
    publishedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(companyId, id, createdAt, updatedAt);
    this._slug = slug;
    this._name = name;
    this._shortDescription = shortDescription;
    this._fullDescription = fullDescription;
    this._ingredients = ingredients;
    this._preparation = preparation;
    this._yieldTotal = yieldTotal;
    this._prepTime = prepTime;
    this._cookTime = cookTime;
    this._restTime = restTime;
    this._difficulty = difficulty;
    this._tools = tools;
    this._notes = notes;
    this._imageUrl = imageUrl;
    this._metaTitle = metaTitle;
    this._metaDescription = metaDescription;
    this._keywords = keywords;
    this._schemaJsonld = schemaJsonld;
    this._relatedRecipeIds = relatedRecipeIds;
    this._views = views;
    this._likes = likes;
    this._active = active;
    this._images = images;
    this._categoryId = categoryId;
    this._publishedAt = publishedAt;
  }

  static restore(
    id: string,
    slug: string,
    name: string,
    shortDescription: string,
    fullDescription: string,
    ingredients: string,
    preparation: string,
    yieldTotal: string,
    prepTime: number,
    cookTime: number,
    restTime: number,
    difficulty: string,
    tools: string,
    notes: string,
    imageUrl: string,
    metaTitle: string,
    metaDescription: string,
    keywords: string[],
    schemaJsonld: string,
    relatedRecipeIds: string[],
    views: number,
    likes: number,
    active: ActiveEnum,
    publishedAt: Date,
    images: Image[],
    categoryId: string,
    companyId: string,
    createdAt: Date,
    updatedAt: Date
  ): RecipeRecipes {
    return new RecipeRecipes(
      Slug.restore(slug),
      name,
      shortDescription,
      fullDescription,
      ingredients,
      preparation,
      yieldTotal,
      prepTime,
      cookTime,
      restTime,
      difficulty,
      tools,
      notes,
      imageUrl,
      metaTitle,
      metaDescription,
      keywords,
      schemaJsonld,
      relatedRecipeIds,
      views,
      likes,
      active,
      images,
      categoryId,
      companyId,
      id,
      publishedAt,
      createdAt,
      updatedAt
    );
  }

  static create(
    model: RecipeRecipesCreateDataModel,
    companyId: string
  ): RecipeRecipes {
    const recipe = new RecipeRecipes(
      Slug.create(model.name),
      model.name,
      model.shortDescription,
      model.fullDescription,
      model.ingredients,
      model.preparation,
      model.yieldTotal,
      model.prepTime,
      model.cookTime,
      model.restTime,
      model.difficulty,
      model.tools,
      model.notes,
      "",
      model.metaTitle,
      model.metaDescription,
      model.keywords,
      "",
      model.relatedRecipeIds,
      0,
      0,
      model.active,
      [],
      model.categoryId,
      companyId
    );
    recipe.gerarJsonLdReceita();
    return recipe;
  }

  update(model: RecipeRecipesUpdateDataModel) {
    this.updateBase();
    this._slug = Slug.restore(model.slug);
    this._name = model.name;
    this._shortDescription = model.shortDescription;
    this._fullDescription = model.fullDescription;
    this._ingredients = model.ingredients;
    this._preparation = model.preparation;
    this._yieldTotal = model.yieldTotal;
    this._prepTime = model.prepTime;
    this._cookTime = model.cookTime;
    this._restTime = model.restTime;
    this._difficulty = model.difficulty;
    this._tools = model.tools;
    this._notes = model.notes;
    this._metaTitle = model.metaTitle;
    this._metaDescription = model.metaDescription;
    this._categoryId = model.metaDescription;
    this._keywords = model.keywords;
    this._relatedRecipeIds = model.relatedRecipeIds;
    this._imageUrl = model.imageUrl;
    this._active = model.active;
    this._categoryId = model.categoryId;
    this.gerarJsonLdReceita();
  }

  setImage(imageUrl: string) {
    this._imageUrl = imageUrl;
  }

  private gerarJsonLdReceita() {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: this._name,
      author: {
        "@type": "Organization",
        name: "Mais Receitas",
      },
      description: this._fullDescription,
      image: [`${process.env.API_BASE_URL}${this._imageUrl}`],
      prepTime: this._prepTime ? `PT${this._prepTime}M` : "Não se aplica",
      cookTime: this._cookTime ? `PT${this._cookTime}M` : "Não se aplica",
      recipeYield: this._yieldTotal,
      recipeCategory: "",
      recipeCuisine: "",
      keywords: this._keywords.join(", "),
      shortDescription: this._shortDescription,
      fullDescription: this._fullDescription,
      difficulty: this._difficulty,
      recipeIngredient: this.removeHtml(this._ingredients).split("\n"),
      recipeInstructions: this.preparation.split("\n").map((step) => ({
        "@type": "HowToStep",
        text: this.removeHtml(step),
      })),
      recipeTools: this.removeHtml(this._tools).split("\n"),
      recipeNotes: this.removeHtml(this._notes).split("\n"),
      publishedAt: this._publishedAt,
    };
    this._schemaJsonld = JSON.stringify(jsonLd, null, 2).replace(/"@/g, '"__');
  }

  private removeHtml(str: string): string {
    return str.replace(/<[^>]*>/g, "").trim();
  }
}

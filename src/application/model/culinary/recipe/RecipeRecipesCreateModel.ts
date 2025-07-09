export class RecipeRecipesCreateDataModel {
  constructor(
    readonly name: string,
    readonly shortDescription: string,
    readonly fullDescription: string,
    readonly ingredients: string,
    readonly preparation: string,
    readonly yieldTotal: string,
    readonly prepTime: number,
    readonly cookTime: number,
    readonly restTime: number,
    readonly difficulty: string,
    readonly tools: string,
    readonly notes: string,
    readonly metaTitle: string,
    readonly metaDescription: string,
    readonly keywords: string[],
    readonly relatedRecipeIds: string[],
    readonly active: number,
    readonly categoryId: string,
    readonly imageUpload?: string
  ) {}
}

export class RecipeUpdateDataModel {
  constructor(
    readonly id: string,
    readonly slug: string,
    readonly name: string,
    readonly ingredients: string,
    readonly preparation: string,
    readonly active: number,
    readonly categoryId: string,
    readonly imageUpload?: string
  ) {}
}

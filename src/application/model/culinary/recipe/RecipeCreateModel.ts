export class RecipeCreateDataModel {
  constructor(
    readonly name: string,
    readonly ingredients: string,
    readonly preparation: string,
    readonly active: number,
    readonly categoryId: string,
    readonly imageUpload?: string
  ) {}
}

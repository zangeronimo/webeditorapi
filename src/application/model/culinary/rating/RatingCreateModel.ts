export class RatingCreateDataModel {
  constructor(
    readonly rate: number,
    readonly comment: string,
    readonly active: number,
    readonly recipeId: string,
    readonly name?: string
  ) {}
}

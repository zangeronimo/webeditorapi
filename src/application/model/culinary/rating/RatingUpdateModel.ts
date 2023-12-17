export class LevelUpdateDataModel {
  constructor(
    readonly id: string,
    readonly rate: number,
    readonly comment: string,
    readonly active: number,
    readonly recipeId: string,
    readonly name?: string
  ) {}
}

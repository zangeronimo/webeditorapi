export class CategoryUpdateDataModel {
  constructor(
    readonly id: string,
    readonly slug: string,
    readonly name: string,
    readonly active: number,
    readonly levelId: string
  ) {}
}

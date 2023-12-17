export class CategoryCreateDataModel {
  constructor(
    readonly name: string,
    readonly active: number,
    readonly levelId: string
  ) {}
}

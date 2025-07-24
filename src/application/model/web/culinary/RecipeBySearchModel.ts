export class RecipeGetBySearchModel {
  constructor(
    readonly q: string,
    readonly level: string,
    readonly time: string,
    readonly difficulty: string
  ) {}

  validate = () => {
    return this.q || this.level || this.time || this.difficulty;
  };
}

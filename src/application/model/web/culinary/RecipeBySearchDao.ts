import { RecipeDto } from "@domain/dto/culinary";

export class RecipeGetBySearchDao {
  constructor(
    readonly q: string,
    readonly category: string,
    readonly time: string,
    readonly difficulty: string
  ) {}

  validate = () => {
    return this.q || this.category || this.time || this.difficulty;
  };
}

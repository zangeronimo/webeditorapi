import { RecipeDto } from "@domain/dto/culinary";

export class RecipeGetAllDao {
  constructor(readonly total: number, readonly withImage: boolean) {}
}

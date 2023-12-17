import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IRecipeGetAll {
  executeAsync(
    model: GetAllRecipeFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}

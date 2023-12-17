import { GetAllCategoryFilterModel } from "@application/model/culinary/category";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface ICategoryGetAll {
  executeAsync(
    model: GetAllCategoryFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}

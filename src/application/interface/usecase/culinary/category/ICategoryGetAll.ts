import { GetAllCategoryFilterModel } from "@application/model/culinary/category";
import { CategoryDto } from "@domain/dto/culinary";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface ICategoryGetAll {
  executeAsync(
    model: GetAllCategoryFilterModel,
    company: string
  ): Promise<PaginatorResultDto<CategoryDto[]>>;
}

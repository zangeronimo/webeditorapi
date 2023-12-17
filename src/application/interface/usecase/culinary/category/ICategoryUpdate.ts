import { CategoryUpdateDataModel } from "@application/model/culinary/category";
import { CategoryDto } from "@domain/dto/culinary";

export interface ICategoryUpdate {
  executeAsync(
    categoryData: CategoryUpdateDataModel,
    company: string
  ): Promise<CategoryDto>;
}

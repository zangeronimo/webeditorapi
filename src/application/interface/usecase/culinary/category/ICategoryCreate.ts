import { CategoryCreateDataModel } from "@application/model/culinary/category";
import { CategoryDto } from "@domain/dto/culinary";

export interface ICategoryCreate {
  executeAsync(
    categoryData: CategoryCreateDataModel,
    company: string
  ): Promise<CategoryDto>;
}

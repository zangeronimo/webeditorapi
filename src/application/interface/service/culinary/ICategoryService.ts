import { CategoryDto } from "@domain/dto/culinary";

export interface ICategoryService {
  getBySlugAsync(
    levelSlug: string,
    categorySlug: string,
    company: string
  ): Promise<CategoryDto>;
}

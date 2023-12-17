import { CategoryDto } from "@domain/dto/culinary";

export interface ICategoryDelete {
  executeAsync(id: string, company: string): Promise<CategoryDto>;
}

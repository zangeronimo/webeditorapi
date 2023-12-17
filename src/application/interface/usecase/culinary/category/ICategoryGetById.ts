import { CategoryDto } from "@domain/dto/culinary";

export interface ICategoryGetById {
  executeAsync(id: string, company: string): Promise<CategoryDto>;
}

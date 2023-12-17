import { GetAllCategoryFilterModel } from "@application/model/culinary/category";
import { Category } from "@domain/entity/culinary";

export interface ICategoryRepository {
  getByIdAsync(id: string, company: string): Promise<Category | null>;
  getBySlugAsync(slug: string, company: string): Promise<Category | null>;
  getAllAsync(
    model: GetAllCategoryFilterModel,
    company: string
  ): Promise<{ itens: Category[]; total: number }>;
  updateAsync(category: Category): Promise<Category>;
  saveAsync(category: Category): Promise<Category>;
  deleteAsync(category: Category, date: Date): Promise<Category>;
}

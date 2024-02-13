import { BannerCategoryDto } from "@domain/dto/publicity";

export interface IBannerCategoryGetById {
  executeAsync(id: string, company: string): Promise<BannerCategoryDto>;
}

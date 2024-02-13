import { BannerCategoryDto } from "@domain/dto/publicity";

export interface IBannerCategoryDelete {
  executeAsync(id: string, company: string): Promise<BannerCategoryDto>;
}

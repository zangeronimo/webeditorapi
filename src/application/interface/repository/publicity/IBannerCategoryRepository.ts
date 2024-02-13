import { GetAllBannersCategoriesFilterModel } from "@application/model/publicity/bannerCategory";
import { BannerCategory } from "@domain/entity/publicity";

export interface IBannerCategoryRepository {
  getByIdAsync(id: string, company: string): Promise<BannerCategory | null>;
  getByNameAsync(name: string, company: string): Promise<BannerCategory | null>;
  getAllAsync(
    model: GetAllBannersCategoriesFilterModel,
    company: string
  ): Promise<{ itens: BannerCategory[]; total: number }>;
  updateAsync(bannerCategory: BannerCategory): Promise<BannerCategory>;
  saveAsync(bannerCategory: BannerCategory): Promise<BannerCategory>;
  deleteAsync(
    bannerCategory: BannerCategory,
    date: Date
  ): Promise<BannerCategory>;
}

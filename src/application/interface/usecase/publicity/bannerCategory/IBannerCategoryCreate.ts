import { BannerCategoryCreateDataModel } from "@application/model/publicity/bannerCategory";
import { BannerCategoryDto } from "@domain/dto/publicity";

export interface IBannerCategoryCreate {
  executeAsync(
    categoryData: BannerCategoryCreateDataModel,
    company: string
  ): Promise<BannerCategoryDto>;
}

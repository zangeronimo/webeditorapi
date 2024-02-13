import { BannerCategoryUpdateDataModel } from "@application/model/publicity/bannerCategory";
import { BannerCategoryDto } from "@domain/dto/publicity";

export interface IBannerCategoryUpdate {
  executeAsync(
    newsletterData: BannerCategoryUpdateDataModel,
    company: string
  ): Promise<BannerCategoryDto>;
}

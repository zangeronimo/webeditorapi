import { GetAllBannersCategoriesFilterModel } from "@application/model/publicity/bannerCategory";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { BannerCategory } from "@domain/entity/publicity";

export interface IBannersCategoriesGetAll {
  executeAsync(
    model: GetAllBannersCategoriesFilterModel,
    company: string
  ): Promise<PaginatorResultDto<BannerCategory[]>>;
}

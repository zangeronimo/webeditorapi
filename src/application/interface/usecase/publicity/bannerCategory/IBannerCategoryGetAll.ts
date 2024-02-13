import { GetAllBannersCategoriesFilterModel } from "@application/model/publicity/bannerCategory";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IBannersCategoriesGetAll {
  executeAsync(
    model: GetAllBannersCategoriesFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}

import { GetAllBannersFilterModel } from "@application/model/publicity/banner";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IBannerGetAll {
  executeAsync(
    model: GetAllBannersFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}

import { BannerCreateDataModel } from "@application/model/publicity/banner";
import { BannerDto } from "@domain/dto/publicity";

export interface IBannerCreate {
  executeAsync(
    bannerData: BannerCreateDataModel,
    company: string
  ): Promise<BannerDto>;
}

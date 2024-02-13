import { BannerUpdateDataModel } from "@application/model/publicity/banner";
import { BannerDto } from "@domain/dto/publicity";

export interface IBannerUpdate {
  executeAsync(
    newsletterData: BannerUpdateDataModel,
    company: string
  ): Promise<BannerDto>;
}

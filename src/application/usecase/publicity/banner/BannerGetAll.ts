import { IBannerRepository } from "@application/interface/repository/publicity";
import { IBannerGetAll } from "@application/interface/usecase/publicity/banner";
import { GetAllBannersFilterModel } from "@application/model/publicity/banner";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { BannerDto } from "@domain/dto/publicity";
import { Banner } from "@domain/entity/publicity";
import { inject, injectable } from "tsyringe";

@injectable()
export class BannerGetAll implements IBannerGetAll {
  constructor(
    @inject("IBannerRepository")
    readonly _bannerRepository: IBannerRepository
  ) {}

  async executeAsync(model: GetAllBannersFilterModel, company: string) {
    const { itens: banners, total } = await this._bannerRepository.getAllAsync(
      model,
      company
    )!;
    const bannersDto = banners.map((banner: Banner) => new BannerDto(banner));
    return new PaginatorResultDto(bannersDto, total);
  }
}

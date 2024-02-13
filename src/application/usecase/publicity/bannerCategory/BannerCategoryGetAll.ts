import { IBannerCategoryRepository } from "@application/interface/repository/publicity";
import { IBannersCategoriesGetAll } from "@application/interface/usecase/publicity/bannerCategory";
import { GetAllBannersCategoriesFilterModel } from "@application/model/publicity/bannerCategory";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { BannerCategoryDto } from "@domain/dto/publicity";
import { BannerCategory } from "@domain/entity/publicity";
import { inject, injectable } from "tsyringe";

@injectable()
export class BannerCategoryGetAll implements IBannersCategoriesGetAll {
  constructor(
    @inject("IBannerCategoryRepository")
    readonly _bannerCategoryRepository: IBannerCategoryRepository
  ) {}

  async executeAsync(
    model: GetAllBannersCategoriesFilterModel,
    company: string
  ) {
    const { itens: bannerCategorys, total } =
      await this._bannerCategoryRepository.getAllAsync(model, company)!;
    const bannerCategorysDto = bannerCategorys.map(
      (bannerCategory: BannerCategory) => new BannerCategoryDto(bannerCategory)
    );
    return new PaginatorResultDto(bannerCategorysDto, total);
  }
}

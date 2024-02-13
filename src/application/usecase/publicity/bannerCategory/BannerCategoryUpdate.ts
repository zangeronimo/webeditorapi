import { IBannerCategoryRepository } from "@application/interface/repository/publicity";
import { IBannerCategoryUpdate } from "@application/interface/usecase/publicity/bannerCategory";
import { Messages } from "@application/messages/Messages";
import { BannerCategoryUpdateDataModel } from "@application/model/publicity/bannerCategory";
import { BannerCategoryDto } from "@domain/dto/publicity";
import { inject, injectable } from "tsyringe";

@injectable()
export class BannerCategoryUpdate implements IBannerCategoryUpdate {
  constructor(
    @inject("IBannerCategoryRepository")
    readonly _bannerCategoryRepository: IBannerCategoryRepository
  ) {}

  async executeAsync(
    bannerCategoryData: BannerCategoryUpdateDataModel,
    company: string
  ) {
    const bannerCategory = await this._bannerCategoryRepository.getByIdAsync(
      bannerCategoryData.id,
      company
    )!;
    if (bannerCategory === null) {
      throw new Error(Messages.notFound("Category"));
    }
    if (bannerCategoryData.name !== bannerCategory.name) {
      const existName = await this._bannerCategoryRepository.getByNameAsync(
        bannerCategoryData.name,
        company
      );
      if (existName !== null && existName.id !== bannerCategoryData.id) {
        throw new Error(Messages.alreadyInUse("Name"));
      }
    }
    bannerCategory.update(bannerCategoryData);
    await this._bannerCategoryRepository.updateAsync(bannerCategory);
    return new BannerCategoryDto(bannerCategory);
  }
}

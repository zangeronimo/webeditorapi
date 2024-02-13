import { IBannerCategoryRepository } from "@application/interface/repository/publicity";
import { IBannerCategoryCreate } from "@application/interface/usecase/publicity/bannerCategory";
import { Messages } from "@application/messages/Messages";
import { BannerCategoryCreateDataModel } from "@application/model/publicity/bannerCategory";
import { BannerCategoryDto } from "@domain/dto/publicity";
import { BannerCategory } from "@domain/entity/publicity";
import { inject, injectable } from "tsyringe";

@injectable()
export class BannerCategoryCreate implements IBannerCategoryCreate {
  constructor(
    @inject("IBannerCategoryRepository")
    readonly _bannerCategoryRepository: IBannerCategoryRepository
  ) {}

  async executeAsync(
    bannerCategoryData: BannerCategoryCreateDataModel,
    company: string
  ) {
    const bannerCategory = BannerCategory.create(bannerCategoryData, company);
    if (bannerCategory === null) {
      throw new Error(Messages.notCreated("Category"));
    }
    const nameExists = await this._bannerCategoryRepository.getByNameAsync(
      bannerCategory.name!,
      company
    );
    if (nameExists !== null) {
      throw new Error(Messages.alreadyInUse("Name"));
    }
    await this._bannerCategoryRepository.saveAsync(bannerCategory);
    return new BannerCategoryDto(bannerCategory);
  }
}

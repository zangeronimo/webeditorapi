import { IBannerCategoryRepository } from "@application/interface/repository/publicity";
import { IBannerCategoryGetById } from "@application/interface/usecase/publicity/bannerCategory";
import { Messages } from "@application/messages/Messages";
import { BannerCategoryDto } from "@domain/dto/publicity";
import { inject, injectable } from "tsyringe";

@injectable()
export class BannerCategoryGetById implements IBannerCategoryGetById {
  constructor(
    @inject("IBannerCategoryRepository")
    readonly _bannerCategoryRepository: IBannerCategoryRepository
  ) {}

  async executeAsync(id: string, company: string) {
    const bannerCategory = await this._bannerCategoryRepository.getByIdAsync(
      id,
      company
    )!;
    if (bannerCategory === null) {
      throw new Error(Messages.notFound("Category"));
    }
    return new BannerCategoryDto(bannerCategory);
  }
}

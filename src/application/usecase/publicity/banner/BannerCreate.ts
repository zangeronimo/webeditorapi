import { IStorageProvider } from "@application/interface/provider/IStorageProvider";
import { IBannerRepository } from "@application/interface/repository/publicity";
import { IBannerCreate } from "@application/interface/usecase/publicity/banner";
import { Messages } from "@application/messages/Messages";
import { BannerCreateDataModel } from "@application/model/publicity/banner";
import { BannerDto } from "@domain/dto/publicity";
import { Banner } from "@domain/entity/publicity";
import { inject, injectable } from "tsyringe";

@injectable()
export class BannerCreate implements IBannerCreate {
  constructor(
    @inject("IBannerRepository")
    readonly _bannerRepository: IBannerRepository,
    @inject("IStorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async executeAsync(bannerData: BannerCreateDataModel, company: string) {
    const image = bannerData.imageUpload
      ? await this.storageProvider.saveFile(
          bannerData.imageUpload,
          `${company}/publicity/banners`
        )
      : "";
    const banner = Banner.create(bannerData, image, company);
    if (banner === null) {
      throw new Error(Messages.notCreated("Banner"));
    }

    const titleExists = await this._bannerRepository.getByTitleAsync(
      banner.title,
      banner.bannerCategory,
      company
    );
    if (titleExists !== null) {
      throw new Error(Messages.alreadyInUse("Title"));
    }
    await this._bannerRepository.saveAsync(banner);
    return new BannerDto(banner);
  }
}

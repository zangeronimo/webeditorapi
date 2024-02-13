import { IStorageProvider } from "@application/interface/provider/IStorageProvider";
import { IBannerRepository } from "@application/interface/repository/publicity";
import { IBannerUpdate } from "@application/interface/usecase/publicity/banner";
import { Messages } from "@application/messages/Messages";
import { BannerUpdateDataModel } from "@application/model/publicity/banner";
import { BannerDto } from "@domain/dto/publicity";
import { inject, injectable } from "tsyringe";

@injectable()
export class BannerUpdate implements IBannerUpdate {
  constructor(
    @inject("IBannerRepository")
    readonly _bannerRepository: IBannerRepository,
    @inject("IStorageProvider")
    readonly _storageProvider: IStorageProvider
  ) {}

  async executeAsync(bannerData: BannerUpdateDataModel, company: string) {
    const banner = await this._bannerRepository.getByIdAsync(
      bannerData.id,
      company
    )!;
    if (banner === null) {
      throw new Error(Messages.notFound("Banner"));
    }
    if (bannerData.title !== banner.title) {
      const existTitle = await this._bannerRepository.getByTitleAsync(
        bannerData.title,
        bannerData.bannerCategory,
        company
      );
      if (existTitle !== null) {
        throw new Error(Messages.alreadyInUse("Title"));
      }
    }
    let image = banner.image;
    if (bannerData.imageUpload) {
      if (image) await this._storageProvider.deleteFile(image);
      image = await this._storageProvider.saveFile(
        bannerData.imageUpload,
        `${company}/publicity/banners`
      );
    }
    banner.update(bannerData, image);
    await this._bannerRepository.updateAsync(banner);
    return new BannerDto(banner);
  }
}

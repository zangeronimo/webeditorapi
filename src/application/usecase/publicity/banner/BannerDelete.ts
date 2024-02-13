import { IStorageProvider } from "@application/interface/provider/IStorageProvider";
import { IBannerRepository } from "@application/interface/repository/publicity";
import { IBannerDelete } from "@application/interface/usecase/publicity/banner";
import { Messages } from "@application/messages/Messages";
import { BannerDto } from "@domain/dto/publicity";
import { inject, injectable } from "tsyringe";

@injectable()
export class BannerDelete implements IBannerDelete {
  constructor(
    @inject("IBannerRepository")
    readonly _bannerRepository: IBannerRepository,
    @inject("IStorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async executeAsync(id: string, company: string) {
    const banner = await this._bannerRepository.getByIdAsync(id, company)!;
    if (banner === null) {
      throw new Error(Messages.notFound("Banner"));
    }
    if (banner.image) await this.storageProvider.deleteFile(banner.image);
    await this._bannerRepository.deleteAsync(banner, new Date());
    return new BannerDto(banner);
  }
}

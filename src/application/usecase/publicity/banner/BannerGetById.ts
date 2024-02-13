import { IBannerRepository } from "@application/interface/repository/publicity";
import { IBannerGetById } from "@application/interface/usecase/publicity/banner";
import { Messages } from "@application/messages/Messages";
import { BannerDto } from "@domain/dto/publicity";
import { inject, injectable } from "tsyringe";

@injectable()
export class BannerGetById implements IBannerGetById {
  constructor(
    @inject("IBannerRepository")
    readonly _bannerRepository: IBannerRepository
  ) {}

  async executeAsync(id: string, company: string) {
    const banner = await this._bannerRepository.getByIdAsync(id, company)!;
    if (banner === null) {
      throw new Error(Messages.notFound("Banner"));
    }
    return new BannerDto(banner);
  }
}

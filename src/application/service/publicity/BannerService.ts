import { IBannerRepository } from "@application/interface/repository/publicity";
import { IBannerService } from "@application/interface/service/publicity/IBannerService";
import { Messages } from "@application/messages/Messages";
import { BannerDto } from "@domain/dto/publicity";
import { inject, injectable } from "tsyringe";

@injectable()
export class BannerService implements IBannerService {
  constructor(
    @inject("IBannerRepository")
    readonly _bannerRepository: IBannerRepository
  ) {}

  async getRandAsync(total: number, company: string): Promise<BannerDto[]> {
    const banners = await this._bannerRepository.getRandAsync(total, company);
    const bannersDto: BannerDto[] = [];

    for (let i = 0; i < banners.length; i++) {
      const banner = banners[i];
      banner.setView();
      await this._bannerRepository.updateAsync(banner);
      const bannerDto = new BannerDto(banner);
      bannersDto.push(bannerDto);
    }

    return bannersDto;
  }

  async setClickAsync(id: string, company: string): Promise<string> {
    const banner = await this._bannerRepository.getByIdAsync(id, company);
    if (!banner) {
      throw new Error(Messages.notFound("Banner"));
    }
    banner.setClick();
    await this._bannerRepository.updateAsync(banner);
    return banner.url;
  }
}

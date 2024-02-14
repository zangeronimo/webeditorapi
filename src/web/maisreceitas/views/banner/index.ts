import { BannerService } from "@application/service/publicity/BannerService";
import { container } from "tsyringe";

export class Banner {
  readonly bannerService = container.resolve(BannerService);
  readonly company = process.env.MAISRECEITAS!;

  setClickAsync = async (id: string) => {
    return await this.bannerService.setClickAsync(id, this.company);
  };
}

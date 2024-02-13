import { BannerDto } from "@domain/dto/publicity";

export interface IBannerGetById {
  executeAsync(id: string, company: string): Promise<BannerDto>;
}

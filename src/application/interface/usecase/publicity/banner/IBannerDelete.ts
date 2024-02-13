import { BannerDto } from "@domain/dto/publicity";

export interface IBannerDelete {
  executeAsync(id: string, company: string): Promise<BannerDto>;
}

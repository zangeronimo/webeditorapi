import { BannerDto } from "@domain/dto/publicity";

export interface IBannerService {
  getRandAsync(total: number, company: string): Promise<BannerDto[]>;
  setClickAsync(id: string, company: string): Promise<string>;
}

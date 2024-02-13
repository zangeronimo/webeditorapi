import { GetAllBannersFilterModel } from "@application/model/publicity/banner";
import { Banner } from "@domain/entity/publicity";

export interface IBannerRepository {
  getByIdAsync(id: string, company: string): Promise<Banner | null>;
  getByTitleAsync(
    title: string,
    category: string,
    company: string
  ): Promise<Banner | null>;
  getAllAsync(
    model: GetAllBannersFilterModel,
    company: string
  ): Promise<{ itens: Banner[]; total: number }>;
  updateAsync(banner: Banner): Promise<Banner>;
  saveAsync(banner: Banner): Promise<Banner>;
  deleteAsync(banner: Banner, date: Date): Promise<Banner>;
}

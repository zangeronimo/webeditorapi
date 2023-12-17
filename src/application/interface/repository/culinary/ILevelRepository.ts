import { GetAllLevelFilterModel } from "@application/model/culinary/level";
import { Level } from "@domain/entity/culinary";

export interface ILevelRepository {
  getByIdAsync(id: string, company: string): Promise<Level | null>;
  getBySlugAsync(slug: string, company: string): Promise<Level | null>;
  getAllAsync(
    model: GetAllLevelFilterModel,
    company: string
  ): Promise<{ itens: Level[]; total: number }>;
  updateAsync(level: Level): Promise<Level>;
  saveAsync(level: Level): Promise<Level>;
  deleteAsync(level: Level, date: Date): Promise<Level>;
}

import { LevelWithCategoryDto } from "@domain/dto/web/culinary/LevelWithCategory";

export interface ILevelDao {
  getAllAsync(company: string): Promise<LevelWithCategoryDto[]>;
}

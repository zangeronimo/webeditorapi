import { LevelWithCategoryDto } from "@domain/dto/web/culinary/LevelWithCategory";

export interface ILevelDao {
  getAllAsync(
    categories: boolean,
    company: string
  ): Promise<LevelWithCategoryDto[]>;
}

import { LevelDto } from "@domain/dto/web/culinary/LevelDto";

export interface ILevelDao {
  getAllAsync(company: string): Promise<LevelDto[]>;
}

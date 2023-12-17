import { LevelUpdateDataModel } from "@application/model/culinary/level";
import { LevelDto } from "@domain/dto/culinary";

export interface ILevelUpdate {
  executeAsync(
    levelData: LevelUpdateDataModel,
    company: string
  ): Promise<LevelDto>;
}

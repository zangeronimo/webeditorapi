import { LevelCreateDataModel } from "@application/model/culinary/level";
import { LevelDto } from "@domain/dto/culinary";

export interface ILevelCreate {
  executeAsync(
    levelData: LevelCreateDataModel,
    company: string
  ): Promise<LevelDto>;
}

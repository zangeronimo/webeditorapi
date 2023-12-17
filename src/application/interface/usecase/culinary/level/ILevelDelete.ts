import { LevelDto } from "@domain/dto/culinary";

export interface ILevelDelete {
  executeAsync(id: string, company: string): Promise<LevelDto>;
}

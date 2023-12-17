import { LevelDto } from "@domain/dto/culinary";

export interface ILevelGetById {
  executeAsync(id: string, company: string): Promise<LevelDto>;
}

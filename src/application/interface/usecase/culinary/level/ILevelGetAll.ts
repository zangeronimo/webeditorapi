import { GetAllLevelFilterModel } from "@application/model/culinary/level";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface ILevelGetAll {
  executeAsync(
    model: GetAllLevelFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}

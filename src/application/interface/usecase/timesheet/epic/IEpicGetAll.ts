import { GetAllEpicFilterModel } from "@application/model/timesheet/epic";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IEpicGetAll {
  executeAsync(
    model: GetAllEpicFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}

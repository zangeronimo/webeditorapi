import { GetAllEpicFilterModel } from "@application/model/timesheet/epic";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { EpicDto } from "@domain/dto/timesheet";

export interface IEpicGetAll {
  executeAsync(
    model: GetAllEpicFilterModel,
    company: string
  ): Promise<PaginatorResultDto<EpicDto[]>>;
}

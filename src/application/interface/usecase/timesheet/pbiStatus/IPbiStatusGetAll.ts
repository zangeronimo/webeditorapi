import { GetAllPbiStatusFilterModel } from "@application/model/timesheet/pbiStatus";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { PbiStatusDto } from "@domain/dto/timesheet";

export interface IPbiStatusGetAll {
  executeAsync(
    model: GetAllPbiStatusFilterModel,
    company: string
  ): Promise<PaginatorResultDto<PbiStatusDto[]>>;
}

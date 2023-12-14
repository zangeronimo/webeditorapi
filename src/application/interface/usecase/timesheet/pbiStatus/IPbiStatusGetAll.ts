import { GetAllPbiStatusFilterModel } from "@application/model/timesheet/pbiStatus";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IPbiStatusGetAll {
  executeAsync(
    model: GetAllPbiStatusFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}

import { GetAllPbiFilterModel } from "@application/model/timesheet/pbi";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IPbiGetAll {
  executeAsync(
    model: GetAllPbiFilterModel,
    userId: string,
    company: string
  ): Promise<PaginatorResultDto>;
}

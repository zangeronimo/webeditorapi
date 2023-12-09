import { GetAllClientFilterModel } from "@application/model/timesheet/client";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IClientGetAll {
  executeAsync(
    model: GetAllClientFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}

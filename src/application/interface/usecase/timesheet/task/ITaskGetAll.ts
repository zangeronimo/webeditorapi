import { GetAllTaskFilterModel } from "@application/model/timesheet/task";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface ITaskGetAll {
  executeAsync(
    model: GetAllTaskFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}

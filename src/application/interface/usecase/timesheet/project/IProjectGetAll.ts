import { GetAllProjectFilterModel } from "@application/model/timesheet/project";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IProjectGetAll {
  executeAsync(
    model: GetAllProjectFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}

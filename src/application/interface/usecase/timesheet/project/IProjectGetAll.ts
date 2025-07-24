import { GetAllProjectFilterModel } from "@application/model/timesheet/project";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { ProjectDto } from "@domain/dto/timesheet";

export interface IProjectGetAll {
  executeAsync(
    model: GetAllProjectFilterModel,
    company: string
  ): Promise<PaginatorResultDto<ProjectDto[]>>;
}

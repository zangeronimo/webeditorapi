import { ProjectDto } from "@domain/dto/timesheet";

export interface IProjectGetById {
  executeAsync(id: string, company: string): Promise<ProjectDto>;
}

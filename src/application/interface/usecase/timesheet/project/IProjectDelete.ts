import { ProjectDto } from "@domain/dto/timesheet";

export interface IProjectDelete {
  executeAsync(id: string, company: string): Promise<ProjectDto>;
}

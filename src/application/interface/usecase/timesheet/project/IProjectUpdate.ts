import { ProjectUpdateDataModel } from "@application/model/timesheet/project";
import { ProjectDto } from "@domain/dto/timesheet";

export interface IProjectUpdate {
  executeAsync(
    projectData: ProjectUpdateDataModel,
    company: string
  ): Promise<ProjectDto>;
}

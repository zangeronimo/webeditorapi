import { ProjectCreateDataModel } from "@application/model/timesheet/project";
import { ProjectDto } from "@domain/dto/timesheet";

export interface IProjectCreate {
  executeAsync(
    projectData: ProjectCreateDataModel,
    company: string
  ): Promise<ProjectDto>;
}

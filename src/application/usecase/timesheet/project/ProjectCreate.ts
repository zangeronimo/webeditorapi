import { IProjectRepository } from "@application/interface/repository/timesheet/IProjectRepository";
import { IProjectCreate } from "@application/interface/usecase/timesheet/project";
import { Messages } from "@application/messages/Messages";
import { ProjectCreateDataModel } from "@application/model/timesheet/project";
import { ProjectDto } from "@domain/dto/timesheet";
import { Project } from "@domain/entity/timesheet";
import { inject } from "@infra/di/Inject";

export class ProjectCreate implements IProjectCreate {
  @inject("IProjectRepository")
  _projectRepository?: IProjectRepository;

  async executeAsync(projectData: ProjectCreateDataModel, company: string) {
    const nameExists = await this._projectRepository?.getByNameAsync(
      projectData.name,
      projectData.clientId,
      company
    );
    if (nameExists !== null) {
      throw new Error(Messages.alreadyInUse("Name"));
    }
    const project = Project.create(projectData, company);
    await this._projectRepository?.saveAsync(project);
    return new ProjectDto(project);
  }
}

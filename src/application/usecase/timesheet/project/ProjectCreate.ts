import { IClientRepository } from "@application/interface/repository/timesheet";
import { IProjectRepository } from "@application/interface/repository/timesheet/IProjectRepository";
import { IProjectCreate } from "@application/interface/usecase/timesheet/project";
import { Messages } from "@application/messages/Messages";
import { ProjectCreateDataModel } from "@application/model/timesheet/project";
import { ClientDto, ProjectDto } from "@domain/dto/timesheet";
import { Project } from "@domain/entity/timesheet";
import { inject } from "@infra/di/Inject";

export class ProjectCreate implements IProjectCreate {
  @inject("IProjectRepository")
  _projectRepository?: IProjectRepository;
  @inject("IClientRepository")
  _clientRepository?: IClientRepository;

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
    await this._projectRepository?.saveAsync(project)!;
    const client = await this._clientRepository?.getByIdAsync(
      project.clientId!,
      company
    );
    const projectSaved = await this._projectRepository?.getByIdAsync(
      project.id,
      company
    );
    return new ProjectDto(projectSaved!, new ClientDto(client!));
  }
}

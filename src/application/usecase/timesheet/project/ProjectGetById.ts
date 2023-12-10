import { IClientRepository } from "@application/interface/repository/timesheet";
import { IProjectRepository } from "@application/interface/repository/timesheet/IProjectRepository";
import { IProjectGetById } from "@application/interface/usecase/timesheet/project";
import { Messages } from "@application/messages/Messages";
import { ClientDto, ProjectDto } from "@domain/dto/timesheet";
import { inject } from "@infra/di/Inject";

export class ProjectGetById implements IProjectGetById {
  @inject("IProjectRepository")
  _projectRepository?: IProjectRepository;
  @inject("IClientRepository")
  _clientRepository?: IClientRepository;

  async executeAsync(id: string, company: string) {
    const project = await this._projectRepository?.getByIdAsync(id, company)!;
    if (project === null) {
      throw new Error(Messages.notFound("Project"));
    }
    const client = await this._clientRepository?.getByIdAsync(
      project.clientId!,
      company
    );
    return new ProjectDto(project, new ClientDto(client!));
  }
}

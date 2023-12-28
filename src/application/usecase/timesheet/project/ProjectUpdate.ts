import {
  IClientRepository,
  IProjectRepository,
} from "@application/interface/repository/timesheet";
import { IProjectUpdate } from "@application/interface/usecase/timesheet/project";
import { Messages } from "@application/messages/Messages";
import { ProjectUpdateDataModel } from "@application/model/timesheet/project";
import { ClientDto, ProjectDto } from "@domain/dto/timesheet";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProjectUpdate implements IProjectUpdate {
  constructor(
    @inject("IProjectRepository")
    readonly _projectRepository: IProjectRepository,
    @inject("IClientRepository")
    readonly _clientRepository: IClientRepository,
  ) {}

  async executeAsync(projectData: ProjectUpdateDataModel, company: string) {
    const project = await this._projectRepository.getByIdAsync(
      projectData.id,
      company
    )!;
    if (project === null) {
      throw new Error(Messages.notFound("Project"));
    }
    if (projectData.name !== project.name) {
      const existName = await this._projectRepository.getByNameAsync(
        projectData.name,
        projectData.clientId,
        company
      );
      if (existName !== null) {
        throw new Error(Messages.alreadyInUse("Name"));
      }
    }
    project.update(projectData);
    await this._projectRepository.updateAsync(project);
    const client = await this._clientRepository.getByIdAsync(
      project.clientId!,
      company
    );
    return new ProjectDto(project, new ClientDto(client!));
  }
}

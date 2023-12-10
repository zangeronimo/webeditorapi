import {
  IEpicRepository,
  IProjectRepository,
} from "@application/interface/repository/timesheet";
import { IEpicGetById } from "@application/interface/usecase/timesheet/epic";
import { Messages } from "@application/messages/Messages";
import { EpicDto, ProjectDto } from "@domain/dto/timesheet";
import { inject } from "@infra/di/Inject";

export class EpicGetById implements IEpicGetById {
  @inject("IEpicRepository")
  _epicRepository?: IEpicRepository;
  @inject("IProjectRepository")
  _projectRepository?: IProjectRepository;

  async executeAsync(id: string, company: string) {
    const epic = await this._epicRepository?.getByIdAsync(id, company)!;
    if (epic === null) {
      throw new Error(Messages.notFound("Epic"));
    }
    const project = await this._projectRepository?.getByIdAsync(
      epic.projectId!,
      company
    );
    return new EpicDto(epic, new ProjectDto(project!));
  }
}

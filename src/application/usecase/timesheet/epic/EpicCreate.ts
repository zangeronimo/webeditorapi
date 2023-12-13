import { IProjectRepository } from "@application/interface/repository/timesheet";
import { IEpicRepository } from "@application/interface/repository/timesheet/IEpicRepository";
import { IEpicCreate } from "@application/interface/usecase/timesheet/epic";
import { Messages } from "@application/messages/Messages";
import { EpicCreateDataModel } from "@application/model/timesheet/epic";
import { EpicDto, ProjectDto } from "@domain/dto/timesheet";
import { Epic } from "@domain/entity/timesheet";
import { inject } from "@infra/di/Inject";

export class EpicCreate implements IEpicCreate {
  @inject("IEpicRepository")
  _epicRepository?: IEpicRepository;
  @inject("IProjectRepository")
  _projectRepository?: IProjectRepository;

  async executeAsync(epicData: EpicCreateDataModel, company: string) {
    const nameExists = await this._epicRepository?.getByNameAsync(
      epicData.name,
      epicData.projectId,
      company
    );
    if (nameExists !== null) {
      throw new Error(Messages.alreadyInUse("Name"));
    }
    const epic = Epic.create(epicData, company);
    await this._epicRepository?.saveAsync(epic);
    const project = await this._projectRepository?.getByIdAsync(
      epic.projectId!,
      company
    );
    const epicSaved = await this._epicRepository?.getByIdAsync(
      epic.id,
      company
    );
    return new EpicDto(epicSaved!, new ProjectDto(project!));
  }
}

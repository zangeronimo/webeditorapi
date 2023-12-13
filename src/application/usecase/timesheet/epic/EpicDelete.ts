import {
  IEpicRepository,
  IProjectRepository,
} from "@application/interface/repository/timesheet";
import { IEpicDelete } from "@application/interface/usecase/timesheet/epic";
import { Messages } from "@application/messages/Messages";
import { inject } from "@infra/di/Inject";

export class EpicDelete implements IEpicDelete {
  @inject("IEpicRepository")
  _epicRepository?: IEpicRepository;
  @inject("IProjectRepository")
  _projectRepository?: IProjectRepository;

  async executeAsync(id: string, company: string) {
    const epic = await this._epicRepository?.getByIdAsync(id, company)!;
    if (epic === null) {
      throw new Error(Messages.notFound("Epic"));
    }
    await this._epicRepository?.deleteAsync(epic, new Date());
  }
}

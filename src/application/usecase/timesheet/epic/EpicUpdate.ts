import { IEpicRepository } from "@application/interface/repository/timesheet";
import { IEpicUpdate } from "@application/interface/usecase/timesheet/epic";
import { Messages } from "@application/messages/Messages";
import { EpicUpdateDataModel } from "@application/model/timesheet/epic";
import { EpicDto } from "@domain/dto/timesheet";
import { inject } from "@infra/di/Inject";

export class EpicUpdate implements IEpicUpdate {
  @inject("IEpicRepository")
  _epicRepository?: IEpicRepository;

  async executeAsync(epicData: EpicUpdateDataModel, company: string) {
    const epic = await this._epicRepository?.getByIdAsync(
      epicData.id,
      company
    )!;
    if (epic === null) {
      throw new Error(Messages.notFound("Epic"));
    }
    if (epicData.name !== epic.name) {
      const existName = await this._epicRepository?.getByNameAsync(
        epicData.name,
        epicData.projectId,
        company
      );
      if (existName !== null) {
        throw new Error(Messages.alreadyInUse("Name"));
      }
    }
    epic.update(epicData);
    await this._epicRepository?.updateAsync(epic);
    return new EpicDto(epic);
  }
}

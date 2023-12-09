import { IEpicRepository } from "@application/interface/repository/timesheet/IEpicRepository";
import { IEpicCreate } from "@application/interface/usecase/timesheet/epic";
import { Messages } from "@application/messages/Messages";
import { EpicCreateDataModel } from "@application/model/timesheet/epic";
import { EpicDto } from "@domain/dto/timesheet";
import { Epic } from "@domain/entity/timesheet";
import { inject } from "@infra/di/Inject";

export class EpicCreate implements IEpicCreate {
  @inject("IEpicRepository")
  _epicRepository?: IEpicRepository;

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
    return new EpicDto(epic);
  }
}

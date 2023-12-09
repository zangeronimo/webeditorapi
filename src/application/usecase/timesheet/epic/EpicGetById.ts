import { IEpicRepository } from "@application/interface/repository/timesheet/IEpicRepository";
import { IEpicGetById } from "@application/interface/usecase/timesheet/epic";
import { Messages } from "@application/messages/Messages";
import { EpicDto } from "@domain/dto/timesheet";
import { inject } from "@infra/di/Inject";

export class EpicGetById implements IEpicGetById {
  @inject("IEpicRepository")
  _epicRepository?: IEpicRepository;

  async executeAsync(id: string, company: string) {
    const epic = await this._epicRepository?.getByIdAsync(id, company)!;
    if (epic === null) {
      throw new Error(Messages.notFound("Epic"));
    }
    return new EpicDto(epic);
  }
}

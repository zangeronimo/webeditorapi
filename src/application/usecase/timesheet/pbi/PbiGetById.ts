import {
  IEpicRepository,
  IPbiRepository,
} from "@application/interface/repository/timesheet";
import { IPbiGetById } from "@application/interface/usecase/timesheet/pbi";
import { Messages } from "@application/messages/Messages";
import { EpicDto, PbiDto } from "@domain/dto/timesheet";
import { Entry } from "@domain/valueObject/timesheet";
import { inject } from "@infra/di/Inject";

export class PbiGetById implements IPbiGetById {
  @inject("IPbiRepository")
  _pbiRepository?: IPbiRepository;
  @inject("IEpicRepository")
  _epicRepository?: IEpicRepository;

  async executeAsync(id: string, userId: string, company: string) {
    const pbi = await this._pbiRepository?.getByIdAsync(id, company)!;
    if (pbi === null) {
      throw new Error(Messages.notFound("Pbi"));
    }
    const epic = await this._epicRepository?.getByIdAsync(pbi.epicId!, company);
    const totalCalculated = Entry.calculateTotalInHours(pbi.entries);
    const working = await this._pbiRepository?.checkPbiHasOpenedByUser(
      userId,
      pbi.id,
      company
    );
    return new PbiDto(pbi, totalCalculated, new EpicDto(epic!), working);
  }
}

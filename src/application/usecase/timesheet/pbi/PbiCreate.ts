import {
  IEpicRepository,
  IPbiRepository,
} from "@application/interface/repository/timesheet";
import { IPbiCreate } from "@application/interface/usecase/timesheet/pbi";
import { Messages } from "@application/messages/Messages";
import { PbiCreateDataModel } from "@application/model/timesheet/pbi";
import { EpicDto, PbiDto } from "@domain/dto/timesheet";
import { Pbi } from "@domain/entity/timesheet";
import { inject } from "@infra/di/Inject";

export class PbiCreate implements IPbiCreate {
  @inject("IPbiRepository")
  _pbiRepository?: IPbiRepository;
  @inject("IEpicRepository")
  _epicRepository?: IEpicRepository;

  async executeAsync(pbiData: PbiCreateDataModel, company: string) {
    const nameExists = await this._pbiRepository?.getByNameAsync(
      pbiData.name,
      pbiData.epicId,
      company
    );
    if (nameExists !== null) {
      throw new Error(Messages.alreadyInUse("Name"));
    }
    const pbi = Pbi.create(pbiData, company);
    await this._pbiRepository?.saveAsync(pbi);
    const epic = await this._epicRepository?.getByIdAsync(pbi.epicId!, company);
    const pbiSaved = await this._pbiRepository?.getByIdAsync(pbi.id, company);
    return new PbiDto(pbiSaved!, 0, new EpicDto(epic!));
  }
}

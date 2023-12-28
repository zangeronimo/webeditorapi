import {
  IEpicRepository,
  IPbiRepository,
} from "@application/interface/repository/timesheet";
import { IPbiUpdate } from "@application/interface/usecase/timesheet/pbi";
import { Messages } from "@application/messages/Messages";
import { PbiUpdateDataModel } from "@application/model/timesheet/pbi";
import { EpicDto, PbiDto } from "@domain/dto/timesheet";
import { Entry } from "@domain/valueObject/timesheet";
import { inject, injectable } from "tsyringe";

@injectable()
export class PbiUpdate implements IPbiUpdate {
  constructor(
    @inject("IPbiRepository")
    readonly _pbiRepository: IPbiRepository,
    @inject("IEpicRepository")
    readonly _epicRepository: IEpicRepository,
  ) {}

  async executeAsync(
    pbiData: PbiUpdateDataModel,
    userId: string,
    company: string
  ) {
    const pbi = await this._pbiRepository.getByIdAsync(pbiData.id, company)!;
    if (pbi === null) {
      throw new Error(Messages.notFound("Pbi"));
    }
    if (pbiData.name !== pbi.name) {
      const existName = await this._pbiRepository.getByNameAsync(
        pbiData.name,
        pbiData.epicId,
        company
      );
      if (existName !== null) {
        throw new Error(Messages.alreadyInUse("Name"));
      }
    }
    pbi.update(pbiData);
    await this._pbiRepository.updateAsync(pbi);
    const epic = await this._epicRepository.getByIdAsync(pbi.epicId!, company);
    const totalCalculated = Entry.calculateTotalInHours(pbi.entries);
    const working = await this._pbiRepository.checkPbiHasOpenedByUser(
      userId,
      pbi.id,
      company
    );
    return new PbiDto(pbi, totalCalculated, new EpicDto(epic!), working);
  }
}

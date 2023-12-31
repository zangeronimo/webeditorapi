import { IPbiStatusRepository } from "@application/interface/repository/timesheet";
import { IPbiStatusCreate } from "@application/interface/usecase/timesheet/pbiStatus";
import { Messages } from "@application/messages/Messages";
import { PbiStatusCreateDataModel } from "@application/model/timesheet/pbiStatus";
import { PbiStatusDto } from "@domain/dto/timesheet";
import { PbiStatus } from "@domain/entity/timesheet";
import { inject, injectable } from "tsyringe";

@injectable()
export class PbiStatusCreate implements IPbiStatusCreate {
  constructor(
    @inject("IPbiStatusRepository")
    readonly _pbiStatusRepository: IPbiStatusRepository,
  ) {}

  async executeAsync(pbiStatusData: PbiStatusCreateDataModel, company: string) {
    const nameExists = await this._pbiStatusRepository.getByNameAsync(
      pbiStatusData.name,
      company
    );
    if (nameExists !== null) {
      throw new Error(Messages.alreadyInUse("Name"));
    }
    const pbiStatus = PbiStatus.create(pbiStatusData, company);
    await this._pbiStatusRepository.saveAsync(pbiStatus);
    const pbiStatusSaved = await this._pbiStatusRepository.getByIdAsync(
      pbiStatus.id,
      company
    );
    return new PbiStatusDto(pbiStatusSaved!);
  }
}

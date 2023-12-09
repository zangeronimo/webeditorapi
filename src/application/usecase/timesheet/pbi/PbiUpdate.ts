import { IPbiRepository } from "@application/interface/repository/timesheet";
import { IPbiUpdate } from "@application/interface/usecase/timesheet/pbi";
import { Messages } from "@application/messages/Messages";
import { PbiUpdateDataModel } from "@application/model/timesheet/pbi";
import { PbiDto } from "@domain/dto/timesheet";
import { inject } from "@infra/di/Inject";

export class PbiUpdate implements IPbiUpdate {
  @inject("IPbiRepository")
  _pbiRepository?: IPbiRepository;

  async executeAsync(pbiData: PbiUpdateDataModel, company: string) {
    const pbi = await this._pbiRepository?.getByIdAsync(pbiData.id, company)!;
    if (pbi === null) {
      throw new Error(Messages.notFound("Pbi"));
    }
    if (pbiData.name !== pbi.name) {
      const existName = await this._pbiRepository?.getByNameAsync(
        pbiData.name,
        pbiData.epicId,
        company
      );
      if (existName !== null) {
        throw new Error(Messages.alreadyInUse("Name"));
      }
    }
    pbi.update(pbiData);
    await this._pbiRepository?.updateAsync(pbi);
    return new PbiDto(pbi);
  }
}

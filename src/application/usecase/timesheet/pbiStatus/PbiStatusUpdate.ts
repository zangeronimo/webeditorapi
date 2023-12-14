import { IPbiStatusRepository } from "@application/interface/repository/timesheet";
import { IPbiStatusUpdate } from "@application/interface/usecase/timesheet/pbiStatus";
import { Messages } from "@application/messages/Messages";
import { PbiStatusUpdateDataModel } from "@application/model/timesheet/pbiStatus";
import { PbiStatusDto } from "@domain/dto/timesheet";
import { inject } from "@infra/di/Inject";

export class PbiStatusUpdate implements IPbiStatusUpdate {
  @inject("IPbiStatusRepository")
  _pbiStatusRepository?: IPbiStatusRepository;

  async executeAsync(pbiStatusData: PbiStatusUpdateDataModel, company: string) {
    const pbiStatus = await this._pbiStatusRepository?.getByIdAsync(
      pbiStatusData.id,
      company
    )!;
    if (pbiStatus === null) {
      throw new Error(Messages.notFound("PbiStatus"));
    }
    if (pbiStatusData.name !== pbiStatus.name) {
      const existName = await this._pbiStatusRepository?.getByNameAsync(
        pbiStatusData.name,
        pbiStatusData.clientId,
        company
      );
      if (existName !== null) {
        throw new Error(Messages.alreadyInUse("Name"));
      }
    }
    pbiStatus.update(pbiStatusData);
    await this._pbiStatusRepository?.updateAsync(pbiStatus);
    return new PbiStatusDto(pbiStatus);
  }
}

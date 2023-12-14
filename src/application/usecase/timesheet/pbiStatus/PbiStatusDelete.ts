import { IPbiStatusRepository } from "@application/interface/repository/timesheet";
import { IPbiStatusDelete } from "@application/interface/usecase/timesheet/pbiStatus";
import { Messages } from "@application/messages/Messages";
import { inject } from "@infra/di/Inject";

export class PbiStatusDelete implements IPbiStatusDelete {
  @inject("IPbiStatusRepository")
  _pbiStatusRepository?: IPbiStatusRepository;

  async executeAsync(id: string, company: string) {
    const pbiStatus = await this._pbiStatusRepository?.getByIdAsync(
      id,
      company
    )!;
    if (pbiStatus === null) {
      throw new Error(Messages.notFound("PbiStatus"));
    }
    await this._pbiStatusRepository?.deleteAsync(pbiStatus, new Date());
  }
}

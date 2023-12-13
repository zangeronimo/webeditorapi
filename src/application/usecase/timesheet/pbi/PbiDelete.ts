import {
  IEpicRepository,
  IPbiRepository,
} from "@application/interface/repository/timesheet";
import { IPbiDelete } from "@application/interface/usecase/timesheet/pbi";
import { Messages } from "@application/messages/Messages";
import { inject } from "@infra/di/Inject";

export class PbiDelete implements IPbiDelete {
  @inject("IPbiRepository")
  _pbiRepository?: IPbiRepository;
  @inject("IEpicRepository")
  _epicRepository?: IEpicRepository;

  async executeAsync(id: string, company: string) {
    const pbi = await this._pbiRepository?.getByIdAsync(id, company)!;
    if (pbi === null) {
      throw new Error(Messages.notFound("Pbi"));
    }
    await this._pbiRepository?.deleteAsync(pbi, new Date());
  }
}

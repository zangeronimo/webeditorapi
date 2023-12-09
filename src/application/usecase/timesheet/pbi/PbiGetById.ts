import { IPbiRepository } from "@application/interface/repository/timesheet/IPbiRepository";
import { IPbiGetById } from "@application/interface/usecase/timesheet/pbi";
import { Messages } from "@application/messages/Messages";
import { PbiDto } from "@domain/dto/timesheet";
import { inject } from "@infra/di/Inject";

export class PbiGetById implements IPbiGetById {
  @inject("IPbiRepository")
  _pbiRepository?: IPbiRepository;

  async executeAsync(id: string, company: string) {
    const pbi = await this._pbiRepository?.getByIdAsync(id, company)!;
    if (pbi === null) {
      throw new Error(Messages.notFound("Pbi"));
    }
    return new PbiDto(pbi);
  }
}

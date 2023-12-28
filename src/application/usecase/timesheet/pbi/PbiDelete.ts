import {
  IPbiRepository,
} from "@application/interface/repository/timesheet";
import { IPbiDelete } from "@application/interface/usecase/timesheet/pbi";
import { Messages } from "@application/messages/Messages";
import { inject, injectable } from "tsyringe";

@injectable()
export class PbiDelete implements IPbiDelete {
  constructor(
    @inject("IPbiRepository")
    readonly _pbiRepository: IPbiRepository,
  ) {}

  async executeAsync(id: string, company: string) {
    const pbi = await this._pbiRepository.getByIdAsync(id, company)!;
    if (pbi === null) {
      throw new Error(Messages.notFound("Pbi"));
    }
    await this._pbiRepository.deleteAsync(pbi, new Date());
  }
}

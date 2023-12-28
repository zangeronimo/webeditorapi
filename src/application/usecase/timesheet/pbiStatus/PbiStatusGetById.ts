import { IPbiStatusRepository } from "@application/interface/repository/timesheet";
import { IPbiStatusGetById } from "@application/interface/usecase/timesheet/pbiStatus";
import { Messages } from "@application/messages/Messages";
import { PbiStatusDto } from "@domain/dto/timesheet";
import { inject, injectable } from "tsyringe";

@injectable()
export class PbiStatusGetById implements IPbiStatusGetById {
  constructor(
    @inject("IPbiStatusRepository")
    readonly _pbiStatusRepository: IPbiStatusRepository,
  ) {}

  async executeAsync(id: string, company: string) {
    const pbiStatus = await this._pbiStatusRepository.getByIdAsync(
      id,
      company
    )!;
    if (pbiStatus === null) {
      throw new Error(Messages.notFound("PbiStatus"));
    }
    return new PbiStatusDto(pbiStatus);
  }
}

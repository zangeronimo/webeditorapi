import {
  IEpicRepository,
} from "@application/interface/repository/timesheet";
import { IEpicDelete } from "@application/interface/usecase/timesheet/epic";
import { Messages } from "@application/messages/Messages";
import { inject, injectable } from "tsyringe";

@injectable()
export class EpicDelete implements IEpicDelete {
  constructor(
    @inject("IEpicRepository")
    readonly _epicRepository: IEpicRepository,
  ) {}

  async executeAsync(id: string, company: string) {
    const epic = await this._epicRepository.getByIdAsync(id, company)!;
    if (epic === null) {
      throw new Error(Messages.notFound("Epic"));
    }
    await this._epicRepository.deleteAsync(epic, new Date());
  }
}

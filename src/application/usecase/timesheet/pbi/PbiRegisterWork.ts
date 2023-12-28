import { IPbiRepository } from "@application/interface/repository/timesheet/IPbiRepository";
import { IPbiRegisterWork } from "@application/interface/usecase/timesheet/pbi";
import { Messages } from "@application/messages/Messages";
import { EntryTypeEnum } from "@domain/enum";
import { inject, injectable } from "tsyringe";

@injectable()
export class PbiRegisterWork implements IPbiRegisterWork {
  constructor(
    @inject("IPbiRepository")
    readonly _pbiRepository: IPbiRepository,
  ) {}

  async executeAsync(id: string, userId: string, company: string) {
    const checkUserHasOtherPbiOpenedAsync =
      await this._pbiRepository.checkUserHasOtherPbiOpenedAsync(
        userId,
        id,
        company
      );
    if (checkUserHasOtherPbiOpenedAsync) {
      throw new Error(Messages.timesheet.EntryOpened);
    }
    const pbi = await this._pbiRepository.getByIdAsync(id, company)!;
    if (pbi === null) {
      throw new Error(Messages.notFound("Pbi"));
    }
    const lastEntry = pbi.entries.sort(
      (a, b) => a.pointDate.getTime() - b.pointDate.getTime()
    )[pbi.entries.length - 1];

    lastEntry?.validate(new Date());
    if (!lastEntry || lastEntry?.entryType === EntryTypeEnum.CLOSE) {
      pbi.startsWork(userId);
    } else {
      pbi.stopsWork(userId);
    }
    await this._pbiRepository.updateAsync(pbi);
    return Promise.resolve();
  }
}

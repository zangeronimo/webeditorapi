import {
  IEpicRepository,
  IPbiRepository,
} from "@application/interface/repository/timesheet";
import { IPbiGetAll } from "@application/interface/usecase/timesheet/pbi";
import { GetAllPbiFilterModel } from "@application/model/timesheet/pbi";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { EpicDto, PbiDto } from "@domain/dto/timesheet";
import { Entry } from "@domain/valueObject/timesheet";
import { inject, injectable } from "tsyringe";

@injectable()
export class PbiGetAll implements IPbiGetAll {
  constructor(
    @inject("IPbiRepository")
    readonly _pbiRepository: IPbiRepository,
    @inject("IEpicRepository")
    readonly _epicRepository: IEpicRepository,
  ) {}

  async executeAsync(
    model: GetAllPbiFilterModel,
    userId: string,
    company: string
  ) {
    const { itens: pbis, total } = await this._pbiRepository.getAllAsync(
      model,
      company
    )!;

    const pbisDto: PbiDto[] = [];
    for (let i = 0; i < pbis.length; i++) {
      const epic = await this._epicRepository.getByIdAsync(
        pbis[i].epicId!,
        company
      );
      const totalCalculated = Entry.calculateTotalInHours(pbis[i].entries);
      const working = await this._pbiRepository.checkPbiHasOpenedByUser(
        userId,
        pbis[i].id,
        company
      );
      pbisDto.push(
        new PbiDto(pbis[i], totalCalculated, new EpicDto(epic!), working)
      );
    }
    return new PaginatorResultDto(pbisDto, total);
  }
}

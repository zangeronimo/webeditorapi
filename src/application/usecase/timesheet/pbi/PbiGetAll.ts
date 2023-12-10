import {
  IEpicRepository,
  IPbiRepository,
} from "@application/interface/repository/timesheet";
import { IPbiGetAll } from "@application/interface/usecase/timesheet/pbi";
import { GetAllPbiFilterModel } from "@application/model/timesheet/pbi";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { EpicDto, PbiDto } from "@domain/dto/timesheet";
import { Pbi } from "@domain/entity/timesheet";
import { inject } from "@infra/di/Inject";

export class PbiGetAll implements IPbiGetAll {
  @inject("IPbiRepository")
  _pbiRepository?: IPbiRepository;
  @inject("IEpicRepository")
  _epicRepository?: IEpicRepository;

  async executeAsync(model: GetAllPbiFilterModel, company: string) {
    const { itens: pbis, total } = await this._pbiRepository?.getAllAsync(
      model,
      company
    )!;

    const pbisDto: PbiDto[] = [];
    for (let i = 0; i < pbis.length; i++) {
      const epic = await this._epicRepository?.getByIdAsync(
        pbis[i].epicId!,
        company
      );
      pbisDto.push(new PbiDto(pbis[i], new EpicDto(epic!)));
    }
    return new PaginatorResultDto(pbisDto, total);
  }
}

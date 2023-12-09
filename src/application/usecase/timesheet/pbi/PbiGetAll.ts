import { IPbiRepository } from "@application/interface/repository/timesheet/IPbiRepository";
import { IPbiGetAll } from "@application/interface/usecase/timesheet/pbi";
import { GetAllPbiFilterModel } from "@application/model/timesheet/pbi";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { PbiDto } from "@domain/dto/timesheet";
import { Pbi } from "@domain/entity/timesheet";
import { inject } from "@infra/di/Inject";

export class PbiGetAll implements IPbiGetAll {
  @inject("IPbiRepository")
  _pbiRepository?: IPbiRepository;

  async executeAsync(model: GetAllPbiFilterModel, company: string) {
    const { itens: pbis, total } = await this._pbiRepository?.getAllAsync(
      model,
      company
    )!;

    const pbisDto = pbis.map((pbi: Pbi) => new PbiDto(pbi));
    return new PaginatorResultDto(pbisDto, total);
  }
}

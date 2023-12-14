import { IPbiStatusRepository } from "@application/interface/repository/timesheet";
import { IPbiStatusGetAll } from "@application/interface/usecase/timesheet/pbiStatus";
import { GetAllPbiStatusFilterModel } from "@application/model/timesheet/pbiStatus";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { PbiStatusDto } from "@domain/dto/timesheet";
import { inject } from "@infra/di/Inject";

export class PbiStatusGetAll implements IPbiStatusGetAll {
  @inject("IPbiStatusRepository")
  _pbiStatusRepository?: IPbiStatusRepository;

  async executeAsync(model: GetAllPbiStatusFilterModel, company: string) {
    const { itens: pbiStatuss, total } =
      await this._pbiStatusRepository?.getAllAsync(model, company)!;

    const pbiStatussDto: PbiStatusDto[] = [];
    for (let i = 0; i < pbiStatuss.length; i++) {
      pbiStatussDto.push(new PbiStatusDto(pbiStatuss[i]));
    }
    return new PaginatorResultDto(pbiStatussDto, total);
  }
}

import { IEpicRepository } from "@application/interface/repository/timesheet/IEpicRepository";
import { IEpicGetAll } from "@application/interface/usecase/timesheet/epic";
import { GetAllEpicFilterModel } from "@application/model/timesheet/epic";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { EpicDto } from "@domain/dto/timesheet";
import { Epic } from "@domain/entity/timesheet";
import { inject } from "@infra/di/Inject";

export class EpicGetAll implements IEpicGetAll {
  @inject("IEpicRepository")
  _epicRepository?: IEpicRepository;

  async executeAsync(model: GetAllEpicFilterModel, company: string) {
    const { itens: epics, total } = await this._epicRepository?.getAllAsync(
      model,
      company
    )!;

    const epicsDto = epics.map((epic: Epic) => new EpicDto(epic));
    return new PaginatorResultDto(epicsDto, total);
  }
}

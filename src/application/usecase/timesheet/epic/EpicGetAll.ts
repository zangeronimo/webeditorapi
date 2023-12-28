import { IProjectRepository } from "@application/interface/repository/timesheet";
import { IEpicRepository } from "@application/interface/repository/timesheet/IEpicRepository";
import { IEpicGetAll } from "@application/interface/usecase/timesheet/epic";
import { GetAllEpicFilterModel } from "@application/model/timesheet/epic";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { EpicDto, ProjectDto } from "@domain/dto/timesheet";
import { inject, injectable } from "tsyringe";

@injectable()
export class EpicGetAll implements IEpicGetAll {
  constructor(
    @inject("IEpicRepository")
    readonly _epicRepository: IEpicRepository,
    @inject("IProjectRepository")
    readonly _projectRepository: IProjectRepository,
  ) {}

  async executeAsync(model: GetAllEpicFilterModel, company: string) {
    const { itens: epics, total } = await this._epicRepository.getAllAsync(
      model,
      company
    )!;

    const epicsDto: EpicDto[] = [];
    for (let i = 0; i < epics.length; i++) {
      const project = await this._projectRepository.getByIdAsync(
        epics[i].projectId!,
        company
      );
      epicsDto.push(new EpicDto(epics[i], new ProjectDto(project!)));
    }
    return new PaginatorResultDto(epicsDto, total);
  }
}

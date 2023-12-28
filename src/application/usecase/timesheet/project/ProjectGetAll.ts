import { IClientRepository } from "@application/interface/repository/timesheet";
import { IProjectRepository } from "@application/interface/repository/timesheet/IProjectRepository";
import { IProjectGetAll } from "@application/interface/usecase/timesheet/project";
import { GetAllProjectFilterModel } from "@application/model/timesheet/project";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { ClientDto, ProjectDto } from "@domain/dto/timesheet";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProjectGetAll implements IProjectGetAll {
  constructor(
    @inject("IProjectRepository")
    readonly _projectRepository: IProjectRepository,
    @inject("IClientRepository")
    readonly _clientRepository: IClientRepository,
  ) {}

  async executeAsync(model: GetAllProjectFilterModel, company: string) {
    const { itens: projects, total } =
      await this._projectRepository.getAllAsync(model, company)!;

    const projectsDto: ProjectDto[] = [];
    for (let i = 0; i < projects.length; i++) {
      const client = await this._clientRepository.getByIdAsync(
        projects[i].clientId!,
        company
      );
      projectsDto.push(new ProjectDto(projects[i], new ClientDto(client!)));
    }
    return new PaginatorResultDto(projectsDto, total);
  }
}

import { IProjectRepository } from "@application/interface/repository/timesheet/IProjectRepository";
import { IProjectGetAll } from "@application/interface/usecase/timesheet/project";
import { GetAllProjectFilterModel } from "@application/model/timesheet/project";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { ProjectDto } from "@domain/dto/timesheet";
import { Project } from "@domain/entity/timesheet";
import { inject } from "@infra/di/Inject";

export class ProjectGetAll implements IProjectGetAll {
  @inject("IProjectRepository")
  _projectRepository?: IProjectRepository;

  async executeAsync(model: GetAllProjectFilterModel, company: string) {
    const { itens: projects, total } =
      await this._projectRepository?.getAllAsync(model, company)!;

    const projectsDto = projects.map(
      (project: Project) => new ProjectDto(project)
    );
    return new PaginatorResultDto(projectsDto, total);
  }
}

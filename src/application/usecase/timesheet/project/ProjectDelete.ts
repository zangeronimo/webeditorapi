import { IProjectRepository } from "@application/interface/repository/timesheet/IProjectRepository";
import { IProjectDelete } from "@application/interface/usecase/timesheet/project";
import { Messages } from "@application/messages/Messages";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProjectDelete implements IProjectDelete {
  constructor(
    @inject("IProjectRepository")
    readonly _projectRepository: IProjectRepository,
  ) {}

  async executeAsync(id: string, company: string) {
    const project = await this._projectRepository.getByIdAsync(id, company)!;
    if (project === null) {
      throw new Error(Messages.notFound("Project"));
    }
    await this._projectRepository.deleteAsync(project, new Date());
  }
}

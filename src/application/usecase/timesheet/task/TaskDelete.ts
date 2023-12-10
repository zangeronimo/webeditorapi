import {
  IPbiRepository,
  ITaskRepository,
} from "@application/interface/repository/timesheet";
import { ITaskDelete } from "@application/interface/usecase/timesheet/task";
import { Messages } from "@application/messages/Messages";
import { PbiDto, TaskDto } from "@domain/dto/timesheet";
import { inject } from "@infra/di/Inject";

export class TaskDelete implements ITaskDelete {
  @inject("ITaskRepository")
  _taskRepository?: ITaskRepository;
  @inject("IPbiRepository")
  _pbiRepository?: IPbiRepository;

  async executeAsync(id: string, company: string) {
    const task = await this._taskRepository?.getByIdAsync(id, company)!;
    if (task === null) {
      throw new Error(Messages.notFound("Task"));
    }
    await this._taskRepository?.deleteAsync(task, new Date());
    const pbi = await this._pbiRepository?.getByIdAsync(task.pbiId!, company);
    return new TaskDto(task, 0, new PbiDto(pbi!));
  }
}

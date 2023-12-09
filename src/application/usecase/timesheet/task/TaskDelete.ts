import { ITaskRepository } from "@application/interface/repository/timesheet/ITaskRepository";
import { ITaskDelete } from "@application/interface/usecase/timesheet/task";
import { Messages } from "@application/messages/Messages";
import { TaskDto } from "@domain/dto/timesheet";
import { inject } from "@infra/di/Inject";

export class TaskDelete implements ITaskDelete {
  @inject("ITaskRepository")
  _taskRepository?: ITaskRepository;

  async executeAsync(id: string, company: string) {
    const task = await this._taskRepository?.getByIdAsync(id, company)!;
    if (task === null) {
      throw new Error(Messages.notFound("Task"));
    }
    await this._taskRepository?.deleteAsync(task, new Date());
    return new TaskDto(task, 0);
  }
}

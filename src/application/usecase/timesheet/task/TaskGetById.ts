import { ITaskRepository } from "@application/interface/repository/timesheet/ITaskRepository";
import { ITaskGetById } from "@application/interface/usecase/timesheet/task";
import { Messages } from "@application/messages/Messages";
import { TaskDto } from "@domain/dto/timesheet";
import { Entry } from "@domain/valueObject/timesheet";
import { inject } from "@infra/di/Inject";

export class TaskGetById implements ITaskGetById {
  @inject("ITaskRepository")
  _taskRepository?: ITaskRepository;

  async executeAsync(id: string, company: string) {
    const task = await this._taskRepository?.getByIdAsync(id, company)!;
    if (task === null) {
      throw new Error(Messages.notFound("Task"));
    }
    const totalCalculated = Entry.calculateTotalInHours(task.entries);
    return new TaskDto(task, totalCalculated);
  }
}

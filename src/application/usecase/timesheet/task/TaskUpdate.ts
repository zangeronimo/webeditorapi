import { ITaskRepository } from "@application/interface/repository/timesheet";
import { ITaskUpdate } from "@application/interface/usecase/timesheet/task";
import { Messages } from "@application/messages/Messages";
import { TaskUpdateDataModel } from "@application/model/timesheet/task";
import { TaskDto } from "@domain/dto/timesheet";
import { Entry } from "@domain/valueObject/timesheet";
import { inject } from "@infra/di/Inject";

export class TaskUpdate implements ITaskUpdate {
  @inject("ITaskRepository")
  _taskRepository?: ITaskRepository;

  async executeAsync(taskData: TaskUpdateDataModel, company: string) {
    const task = await this._taskRepository?.getByIdAsync(
      taskData.id,
      company
    )!;
    if (task === null) {
      throw new Error(Messages.notFound("Task"));
    }
    if (taskData.name !== task.name) {
      const existName = await this._taskRepository?.getByNameAsync(
        taskData.name,
        taskData.pbiId,
        company
      );
      if (existName !== null) {
        throw new Error(Messages.alreadyInUse("Name"));
      }
    }
    task.update(taskData);
    await this._taskRepository?.updateAsync(task);
    const totalCalculated = Entry.calculateTotalInHours(task.entries);
    return new TaskDto(task, totalCalculated);
  }
}

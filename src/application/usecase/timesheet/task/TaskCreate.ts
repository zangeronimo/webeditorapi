import { ITaskRepository } from "@application/interface/repository/timesheet/ITaskRepository";
import { ITaskCreate } from "@application/interface/usecase/timesheet/task";
import { Messages } from "@application/messages/Messages";
import { TaskCreateDataModel } from "@application/model/timesheet/task";
import { TaskDto } from "@domain/dto/timesheet";
import { Task } from "@domain/entity/timesheet";
import { inject } from "@infra/di/Inject";

export class TaskCreate implements ITaskCreate {
  @inject("ITaskRepository")
  _taskRepository?: ITaskRepository;

  async executeAsync(taskData: TaskCreateDataModel, company: string) {
    const nameExists = await this._taskRepository?.getByNameAsync(
      taskData.name,
      taskData.pbiId,
      company
    );
    if (nameExists !== null) {
      throw new Error(Messages.alreadyInUse("Name"));
    }
    const task = Task.create(taskData, company);
    await this._taskRepository?.saveAsync(task);
    return new TaskDto(task);
  }
}

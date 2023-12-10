import {
  IPbiRepository,
  ITaskRepository,
} from "@application/interface/repository/timesheet";
import { ITaskCreate } from "@application/interface/usecase/timesheet/task";
import { Messages } from "@application/messages/Messages";
import { TaskCreateDataModel } from "@application/model/timesheet/task";
import { PbiDto, TaskDto } from "@domain/dto/timesheet";
import { Task } from "@domain/entity/timesheet";
import { inject } from "@infra/di/Inject";

export class TaskCreate implements ITaskCreate {
  @inject("ITaskRepository")
  _taskRepository?: ITaskRepository;
  @inject("IPbiRepository")
  _pbiRepository?: IPbiRepository;

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
    const pbi = await this._pbiRepository?.getByIdAsync(task.pbiId!, company);
    return new TaskDto(task, 0, new PbiDto(pbi!));
  }
}

import {
  IPbiRepository,
  ITaskRepository,
} from "@application/interface/repository/timesheet";
import { ITaskGetById } from "@application/interface/usecase/timesheet/task";
import { Messages } from "@application/messages/Messages";
import { PbiDto, TaskDto } from "@domain/dto/timesheet";
import { Entry } from "@domain/valueObject/timesheet";
import { inject } from "@infra/di/Inject";

export class TaskGetById implements ITaskGetById {
  @inject("ITaskRepository")
  _taskRepository?: ITaskRepository;
  @inject("IPbiRepository")
  _pbiRepository?: IPbiRepository;

  async executeAsync(id: string, company: string) {
    const task = await this._taskRepository?.getByIdAsync(id, company)!;
    if (task === null) {
      throw new Error(Messages.notFound("Task"));
    }
    const totalCalculated = Entry.calculateTotalInHours(task.entries);
    const pbi = await this._pbiRepository?.getByIdAsync(task.pbiId!, company);
    return new TaskDto(task, totalCalculated, new PbiDto(pbi!));
  }
}

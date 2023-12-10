import {
  IPbiRepository,
  ITaskRepository,
} from "@application/interface/repository/timesheet";
import { ITaskGetAll } from "@application/interface/usecase/timesheet/task";
import { GetAllTaskFilterModel } from "@application/model/timesheet/task";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { PbiDto, TaskDto } from "@domain/dto/timesheet";
import { Entry } from "@domain/valueObject/timesheet";
import { inject } from "@infra/di/Inject";

export class TaskGetAll implements ITaskGetAll {
  @inject("ITaskRepository")
  _taskRepository?: ITaskRepository;
  @inject("IPbiRepository")
  _pbiRepository?: IPbiRepository;

  async executeAsync(
    model: GetAllTaskFilterModel,
    userId: string,
    company: string
  ) {
    const { itens: tasks, total } = await this._taskRepository?.getAllAsync(
      model,
      company
    )!;

    const tasksDto: TaskDto[] = [];
    for (let i = 0; i < tasks.length; i++) {
      const pbi = await this._pbiRepository?.getByIdAsync(
        tasks[i].pbiId!,
        company
      );
      const totalCalculated = Entry.calculateTotalInHours(tasks[i].entries);
      const working = await this._taskRepository?.checkTaskHasOpenedByUser(
        userId,
        tasks[i].id,
        company
      );
      tasksDto.push(
        new TaskDto(tasks[i], totalCalculated, new PbiDto(pbi!), working)
      );
    }
    return new PaginatorResultDto(tasksDto, total);
  }
}

import { ITaskRepository } from "@application/interface/repository/timesheet/ITaskRepository";
import { ITaskGetAll } from "@application/interface/usecase/timesheet/task";
import { GetAllTaskFilterModel } from "@application/model/timesheet/task";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { TaskDto } from "@domain/dto/timesheet";
import { Task } from "@domain/entity/timesheet";
import { inject } from "@infra/di/Inject";

export class TaskGetAll implements ITaskGetAll {
  @inject("ITaskRepository")
  _taskRepository?: ITaskRepository;

  async executeAsync(model: GetAllTaskFilterModel, company: string) {
    const { itens: tasks, total } = await this._taskRepository?.getAllAsync(
      model,
      company
    )!;

    const tasksDto = tasks.map((task: Task) => new TaskDto(task));
    return new PaginatorResultDto(tasksDto, total);
  }
}

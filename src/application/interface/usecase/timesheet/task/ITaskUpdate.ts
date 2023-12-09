import { TaskUpdateDataModel } from "@application/model/timesheet/task";
import { TaskDto } from "@domain/dto/timesheet";

export interface ITaskUpdate {
  executeAsync(
    taskData: TaskUpdateDataModel,
    company: string
  ): Promise<TaskDto>;
}

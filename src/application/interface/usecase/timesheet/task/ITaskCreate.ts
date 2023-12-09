import { TaskCreateDataModel } from "@application/model/timesheet/task";
import { TaskDto } from "@domain/dto/timesheet";

export interface ITaskCreate {
  executeAsync(
    taskData: TaskCreateDataModel,
    company: string
  ): Promise<TaskDto>;
}

import { TaskDto } from "@domain/dto/timesheet";

export interface ITaskGetById {
  executeAsync(id: string, company: string): Promise<TaskDto>;
}
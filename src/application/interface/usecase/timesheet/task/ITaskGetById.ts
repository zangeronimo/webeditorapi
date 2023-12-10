import { TaskDto } from "@domain/dto/timesheet";

export interface ITaskGetById {
  executeAsync(id: string, userId: string, company: string): Promise<TaskDto>;
}

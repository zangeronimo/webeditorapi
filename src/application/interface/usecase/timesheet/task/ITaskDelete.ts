import { TaskDto } from "@domain/dto/timesheet";

export interface ITaskDelete {
  executeAsync(id: string, company: string): Promise<TaskDto>;
}

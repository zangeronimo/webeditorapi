import { Task } from "@domain/entity/timesheet";
import { PbiDto } from "./PbiDto";

export class TaskDto {
  id: string;
  name: string;
  description: string;
  status: number;

  constructor(
    task: Task,
    readonly totalInHours: number,
    readonly pbi?: PbiDto,
    readonly working = false
  ) {
    this.id = task?.id;
    this.name = task?.name;
    this.description = task?.description;
    this.status = task?.status?.valueOf();
  }
}

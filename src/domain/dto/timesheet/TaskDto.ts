import { Task } from "@domain/entity/timesheet";

export class TaskDto {
  id: string;
  name: string;
  description: string;
  status: number;

  constructor(client: Task, readonly totalInHours: number) {
    this.id = client.id;
    this.name = client.name;
    this.description = client.description;
    this.status = client.status.valueOf();
  }
}

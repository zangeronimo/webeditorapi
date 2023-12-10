import { Epic } from "@domain/entity/timesheet";

export class EpicDto {
  id: string;
  name: string;
  description: string;
  status: number;

  constructor(epic: Epic) {
    this.id = epic.id;
    this.name = epic.name;
    this.description = epic.description;
    this.status = epic.status.valueOf();
  }
}

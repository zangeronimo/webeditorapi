import { Epic } from "@domain/entity/timesheet";

export class EpicDto {
  id: string;
  name: string;
  description: string;
  status: number;

  constructor(client: Epic) {
    this.id = client.id;
    this.name = client.name;
    this.description = client.description;
    this.status = client.status.valueOf();
  }
}

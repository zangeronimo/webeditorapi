import { Pbi } from "@domain/entity/timesheet";

export class PbiDto {
  id: string;
  name: string;
  description: string;
  status: number;

  constructor(client: Pbi) {
    this.id = client.id;
    this.name = client.name;
    this.description = client.description;
    this.status = client.status.valueOf();
  }
}

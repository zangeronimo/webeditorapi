import { Client } from "@domain/entity/timesheet/Client";

export class ClientDto {
  id: string;
  name: string;
  status: number;

  constructor(client: Client) {
    this.id = client.id;
    this.name = client.name;
    this.status = client.status.valueOf();
  }
}

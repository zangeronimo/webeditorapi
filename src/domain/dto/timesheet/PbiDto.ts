import { Pbi } from "@domain/entity/timesheet";

export class PbiDto {
  id: string;
  name: string;
  description: string;
  status: number;

  constructor(pbi: Pbi) {
    this.id = pbi.id;
    this.name = pbi.name;
    this.description = pbi.description;
    this.status = pbi.status.valueOf();
  }
}

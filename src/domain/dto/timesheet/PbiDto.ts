import { Pbi } from "@domain/entity/timesheet";
import { EpicDto } from "./EpicDto";

export class PbiDto {
  id: string;
  name: string;
  description: string;
  status: number;

  constructor(pbi: Pbi, readonly epic?: EpicDto) {
    this.id = pbi?.id;
    this.name = pbi?.name;
    this.description = pbi?.description;
    this.status = pbi?.status?.valueOf();
  }
}

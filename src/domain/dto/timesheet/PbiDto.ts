import { Pbi } from "@domain/entity/timesheet";
import { EpicDto } from "./EpicDto";

export class PbiDto {
  id: string;
  sequence: number;
  name: string;
  description: string;
  status: number;
  pbiStatusId: string;

  constructor(
    pbi: Pbi,
    readonly totalInSeconds: number,
    readonly epic?: EpicDto,
    readonly working = false
  ) {
    this.id = pbi?.id;
    this.sequence = pbi?.sequence!;
    this.name = pbi?.name;
    this.description = pbi?.description;
    this.status = pbi?.status?.valueOf();
    this.pbiStatusId = pbi?.pbiStatusId!;
  }
}

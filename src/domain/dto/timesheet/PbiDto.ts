import { Pbi } from "@domain/entity/timesheet";
import { EpicDto } from "./EpicDto";

export class PbiDto {
  id: string;
  sequence: number;
  name: string;
  description: string;
  order: number;
  status: number;
  epicId: string;
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
    (this.order = pbi?.order), (this.status = pbi?.status?.valueOf());
    this.epicId = pbi?.epicId!;
    this.pbiStatusId = pbi?.pbiStatusId!;
  }
}

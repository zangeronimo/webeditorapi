import { PbiStatus } from "@domain/entity/timesheet";
import { EpicDto } from "./EpicDto";

export class PbiStatusDto {
  id: string;
  name: string;
  order: number;
  status: number;

  constructor(pbiStatus: PbiStatus) {
    this.id = pbiStatus?.id;
    this.name = pbiStatus?.name;
    this.order = pbiStatus?.order;
    this.status = pbiStatus?.status?.valueOf();
  }
}

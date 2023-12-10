import { Epic } from "@domain/entity/timesheet";
import { ProjectDto } from "./ProjectDto";

export class EpicDto {
  id: string;
  name: string;
  description: string;
  status: number;

  constructor(epic: Epic, readonly project?: ProjectDto) {
    this.id = epic?.id;
    this.name = epic?.name;
    this.description = epic?.description;
    this.status = epic?.status?.valueOf();
  }
}

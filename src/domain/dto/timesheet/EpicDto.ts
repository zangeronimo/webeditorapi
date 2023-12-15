import { Epic } from "@domain/entity/timesheet";
import { ProjectDto } from "./ProjectDto";

export class EpicDto {
  id: string;
  sequence: number;
  name: string;
  description: string;
  status: number;
  projectId: string;

  constructor(epic: Epic, readonly project?: ProjectDto) {
    this.id = epic?.id;
    this.sequence = epic?.sequence!;
    this.name = epic?.name;
    this.description = epic?.description;
    this.status = epic?.status?.valueOf();
    this.projectId = epic?.projectId!;
  }
}

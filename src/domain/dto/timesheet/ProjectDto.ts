import { Project } from "@domain/entity/timesheet";
import { ClientDto } from "./ClientDto";

export class ProjectDto {
  id: string;
  sequence: number;
  name: string;
  description: string;
  status: number;
  clientId: string;

  constructor(project: Project, readonly client?: ClientDto) {
    this.id = project?.id;
    this.sequence = project?.sequence!;
    this.name = project?.name;
    this.description = project?.description;
    this.status = project?.status?.valueOf();
    this.clientId = project?.clientId!;
  }
}

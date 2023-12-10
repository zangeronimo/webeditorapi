import { Project } from "@domain/entity/timesheet";
import { ClientDto } from "./ClientDto";

export class ProjectDto {
  id: string;
  name: string;
  description: string;
  status: number;

  constructor(project: Project, readonly client?: ClientDto) {
    this.id = project?.id;
    this.name = project?.name;
    this.description = project?.description;
    this.status = project?.status?.valueOf();
  }
}

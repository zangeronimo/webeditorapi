import { Project } from "@domain/entity/timesheet";

export class ProjectDto {
  id: string;
  name: string;
  description: string;
  status: number;

  constructor(client: Project) {
    this.id = client.id;
    this.name = client.name;
    this.description = client.description;
    this.status = client.status.valueOf();
  }
}

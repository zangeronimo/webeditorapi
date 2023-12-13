import { GetAllProjectFilterModel } from "@application/model/timesheet/project";
import { Project } from "@domain/entity/timesheet";

export interface IProjectRepository {
  getByIdAsync(id: string, company: string): Promise<Project | null>;
  getByNameAsync(
    name: string,
    clientId: string,
    company: string
  ): Promise<Project | null>;
  getAllAsync(
    model: GetAllProjectFilterModel,
    company: string
  ): Promise<{ itens: Project[]; total: number }>;
  updateAsync(project: Project): Promise<void>;
  saveAsync(project: Project): Promise<void>;
  deleteAsync(project: Project, date: Date): Promise<void>;
}

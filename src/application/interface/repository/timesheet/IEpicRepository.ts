import { GetAllEpicFilterModel } from "@application/model/timesheet/epic";
import { Epic } from "@domain/entity/timesheet";

export interface IEpicRepository {
  getByIdAsync(id: string, company: string): Promise<Epic | null>;
  getByNameAsync(
    name: string,
    projectId: string,
    company: string
  ): Promise<Epic | null>;
  getAllAsync(
    model: GetAllEpicFilterModel,
    company: string
  ): Promise<{ itens: Epic[]; total: number }>;
  updateAsync(epic: Epic): Promise<void>;
  saveAsync(epic: Epic): Promise<void>;
  deleteAsync(epic: Epic, date: Date): Promise<void>;
}

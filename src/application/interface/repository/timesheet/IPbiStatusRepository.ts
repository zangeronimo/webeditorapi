import { GetAllPbiStatusFilterModel } from "@application/model/timesheet/pbiStatus";
import { PbiStatus } from "@domain/entity/timesheet";

export interface IPbiStatusRepository {
  getByIdAsync(id: string, company: string): Promise<PbiStatus | null>;
  getByNameAsync(name: string, company: string): Promise<PbiStatus | null>;
  getAllAsync(
    model: GetAllPbiStatusFilterModel,
    company: string
  ): Promise<{ itens: PbiStatus[]; total: number }>;
  updateAsync(pbiStatus: PbiStatus): Promise<void>;
  saveAsync(pbiStatus: PbiStatus): Promise<void>;
  deleteAsync(pbiStatus: PbiStatus, date: Date): Promise<void>;
}

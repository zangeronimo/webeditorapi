import { GetAllPbiFilterModel } from "@application/model/timesheet/pbi";
import { Pbi } from "@domain/entity/timesheet";

export interface IPbiRepository {
  getByIdAsync(id: string, company: string): Promise<Pbi | null>;
  getByNameAsync(
    name: string,
    epicId: string,
    company: string
  ): Promise<Pbi | null>;
  getAllAsync(
    model: GetAllPbiFilterModel,
    company: string
  ): Promise<{ itens: Pbi[]; total: number }>;
  updateAsync(pbi: Pbi): Promise<Pbi>;
  saveAsync(pbi: Pbi): Promise<Pbi>;
  deleteAsync(pbi: Pbi, date: Date): Promise<Pbi>;
}

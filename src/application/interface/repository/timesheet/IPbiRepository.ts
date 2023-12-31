import { GetAllPbiFilterModel } from "@application/model/timesheet/pbi";
import { Pbi } from "@domain/entity/timesheet";

export interface IPbiRepository {
  getByIdAsync(id: string, company: string): Promise<Pbi | null>;
  checkPbiHasOpenedByUser(
    userId: string,
    pbiId: string,
    company: string
  ): Promise<boolean>;
  checkUserHasOtherPbiOpenedAsync(
    userId: string,
    pbiId: string,
    company: string
  ): Promise<boolean>;
  getByNameAsync(
    name: string,
    epicId: string,
    company: string
  ): Promise<Pbi | null>;
  getAllAsync(
    model: GetAllPbiFilterModel,
    company: string
  ): Promise<{ itens: Pbi[]; total: number }>;
  updateAsync(pbi: Pbi): Promise<void>;
  saveAsync(pbi: Pbi): Promise<void>;
  deleteAsync(pbi: Pbi, date: Date): Promise<void>;
}

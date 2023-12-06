import { GetAllCompanyFilterModel } from "@application/model/webeditor/company";
import { Company } from "@domain/entity/webeditor/Company";

export interface ICompanyRepository {
  getByIdAsync(id: string): Promise<Company | null>;
  getByNameAsync(name: string): Promise<Company | null>;
  getAllAsync(
    model: GetAllCompanyFilterModel
  ): Promise<{ itens: Company[]; total: number }>;
  updateAsync(company: Company): Promise<Company>;
  saveAsync(company: Company): Promise<Company>;
  deleteAsync(company: Company, date: Date): Promise<Company>;
}

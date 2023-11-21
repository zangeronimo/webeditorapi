import { GetAllCompanyFilterModel } from "@application/model/webeditor/company/GetAllCompanyFilterModel";
import { Company } from "@domain/entity/webeditor/Company";

export interface ICompanyRepository {
  getById(id: string): Promise<Company | null>;
  getByName(name: string): Promise<Company | null>;
  getAll(
    model: GetAllCompanyFilterModel
  ): Promise<{ itens: Company[]; total: number }>;
  update(company: Company): Promise<Company>;
  save(company: Company): Promise<Company>;
  delete(company: Company, date: Date): Promise<Company>;
}

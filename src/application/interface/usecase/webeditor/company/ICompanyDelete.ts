import { CompanyDto } from "@domain/dto/webeditor";

export interface ICompanyDelete {
  executeAsync(id: string): Promise<CompanyDto>;
}

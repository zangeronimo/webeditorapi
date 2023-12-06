import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";

export interface ICompanyDelete {
  executeAsync(id: string): Promise<CompanyDto>;
}

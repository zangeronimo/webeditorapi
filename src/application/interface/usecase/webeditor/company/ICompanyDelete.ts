import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";

export interface ICompanyDelete {
  ExecuteAsync(id: string): Promise<CompanyDto>;
}

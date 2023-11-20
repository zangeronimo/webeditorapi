import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";

export interface ICompanyGetById {
  ExecuteAsync(id: string): Promise<CompanyDto>;
}

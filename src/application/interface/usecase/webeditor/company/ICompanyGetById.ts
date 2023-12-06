import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";

export interface ICompanyGetById {
  executeAsync(id: string): Promise<CompanyDto>;
}

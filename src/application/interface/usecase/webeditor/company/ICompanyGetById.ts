import { CompanyDto } from "@domain/dto/webeditor";

export interface ICompanyGetById {
  executeAsync(id: string): Promise<CompanyDto>;
}

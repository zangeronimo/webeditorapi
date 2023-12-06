import { CompanyUpdateDataModel } from "@application/model/webeditor/company";
import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";

export interface ICompanyUpdate {
  executeAsync(companyData: CompanyUpdateDataModel): Promise<CompanyDto>;
}

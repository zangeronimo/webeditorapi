import { CompanyUpdateDataModel } from "@application/model/webeditor/company/CompanyUpdateModel";
import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";

export interface ICompanyUpdate {
  executeAsync(companyData: CompanyUpdateDataModel): Promise<CompanyDto>;
}

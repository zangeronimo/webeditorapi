import { CompanyCreateDataModel } from "@application/model/webeditor/company/CompanyCreateModel";
import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";

export interface ICompanyCreate {
  ExecuteAsync(companyData: CompanyCreateDataModel): Promise<CompanyDto>;
}

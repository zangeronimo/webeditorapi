import { CompanyCreateDataModel } from "@application/model/webeditor/company";
import { CompanyDto } from "@domain/dto/webeditor";

export interface ICompanyCreate {
  executeAsync(companyData: CompanyCreateDataModel): Promise<CompanyDto>;
}

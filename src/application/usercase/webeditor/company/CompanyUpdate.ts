import { ICompanyRepository } from "@application/interface/repository/webeditor/ICompanyRepository";
import { ICompanyUpdate } from "@application/interface/usercase/webeditor/company/ICompanyUpdate";
import { Messages } from "@application/messages/Messages";
import { CompanyUpdateDataModel } from "@application/model/webeditor/company/CompanyUpdateModel";
import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";

export class CompanyUpdate implements ICompanyUpdate {
  constructor(readonly _companyRepository: ICompanyRepository) {}

  async ExecuteAsync(companyData: CompanyUpdateDataModel) {
    const company = await this._companyRepository.getById(companyData.id);
    if (company === null) {
      throw new Error(Messages.NotFound("Company"));
    }
    if (companyData.name !== company.name) {
      const existName = await this._companyRepository.getByName(
        companyData.name
      );
      if (existName !== null) {
        throw new Error(Messages.AlreadyInUse("Name"));
      }
    }
    await company.Update(companyData);
    await this._companyRepository.update(company);
    return new CompanyDto(company);
  }
}

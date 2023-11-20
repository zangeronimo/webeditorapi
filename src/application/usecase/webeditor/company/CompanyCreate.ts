import { ICompanyRepository } from "@application/interface/repository/webeditor/ICompanyRepository";
import { ICompanyCreate } from "@application/interface/usecase/webeditor/company/ICompanyCreate";
import { Messages } from "@application/messages/Messages";
import { CompanyCreateDataModel } from "@application/model/webeditor/company/CompanyCreateModel";
import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";
import { Company } from "@domain/entity/Company";

export class CompanyCreate implements ICompanyCreate {
  constructor(readonly _companyRepository: ICompanyRepository) {}

  async ExecuteAsync(companyData: CompanyCreateDataModel) {
    const companyExists = await this._companyRepository.getByName(
      companyData.name
    );
    if (companyExists !== null) {
      throw new Error(Messages.AlreadyInUse("Name"));
    }
    const company = await Company.Create(companyData);
    await this._companyRepository.save(company);
    return new CompanyDto(company);
  }
}

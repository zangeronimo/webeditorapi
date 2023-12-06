import { ICompanyRepository } from "@application/interface/repository/webeditor";
import { ICompanyCreate } from "@application/interface/usecase/webeditor/company";
import { Messages } from "@application/messages/Messages";
import { CompanyCreateDataModel } from "@application/model/webeditor/company";
import { CompanyDto } from "@domain/dto/webeditor";
import { Company } from "@domain/entity/webeditor";
import { inject } from "@infra/di/Inject";

export class CompanyCreate implements ICompanyCreate {
  @inject("ICompanyRepository")
  _companyRepository?: ICompanyRepository;

  async executeAsync(companyData: CompanyCreateDataModel) {
    const companyExists = await this._companyRepository?.getByNameAsync(
      companyData.name
    )!;
    if (companyExists !== null) {
      throw new Error(Messages.alreadyInUse("Name"));
    }
    const company = Company.create(companyData);
    await this._companyRepository?.saveAsync(company);
    return new CompanyDto(company);
  }
}

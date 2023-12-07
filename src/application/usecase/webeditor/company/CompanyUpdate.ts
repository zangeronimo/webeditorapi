import { ICompanyRepository } from "@application/interface/repository/webeditor";
import { ICompanyUpdate } from "@application/interface/usecase/webeditor/company";
import { Messages } from "@application/messages/Messages";
import { CompanyUpdateDataModel } from "@application/model/webeditor/company";
import { CompanyDto } from "@domain/dto/webeditor";
import { inject } from "@infra/di/Inject";

export class CompanyUpdate implements ICompanyUpdate {
  @inject("ICompanyRepository")
  _companyRepository?: ICompanyRepository;

  async executeAsync(companyData: CompanyUpdateDataModel) {
    const company = await this._companyRepository?.getByIdAsync(
      companyData.id
    )!;
    if (company === null) {
      throw new Error(Messages.notFound("Company"));
    }
    if (companyData.name !== company.name) {
      const existName = await this._companyRepository?.getByNameAsync(
        companyData.name
      );
      if (existName !== null) {
        throw new Error(Messages.alreadyInUse("Name"));
      }
    }
    company.update(companyData);
    await this._companyRepository?.updateAsync(company);
    return new CompanyDto(company);
  }
}

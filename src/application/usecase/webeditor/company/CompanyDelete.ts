import { ICompanyRepository } from "@application/interface/repository/webeditor/ICompanyRepository";
import { ICompanyDelete } from "@application/interface/usecase/webeditor/company/ICompanyDelete";
import { Messages } from "@application/messages/Messages";
import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";
import { inject } from "@infra/di/Inject";

export class CompanyDelete implements ICompanyDelete {
  @inject("ICompanyRepository")
  _companyRepository?: ICompanyRepository;

  async ExecuteAsync(id: string) {
    const company = await this._companyRepository?.getById(id)!;
    if (company === null) {
      throw new Error(Messages.NotFound("Company"));
    }
    await this._companyRepository?.delete(company, new Date());
    return new CompanyDto(company);
  }
}

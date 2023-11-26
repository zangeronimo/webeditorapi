import { ICompanyRepository } from "@application/interface/repository/webeditor/ICompanyRepository";
import { ICompanyGetById } from "@application/interface/usecase/webeditor/company/ICompanyGetById";
import { Messages } from "@application/messages/Messages";
import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";
import { inject } from "@infra/di/Inject";

export class CompanyGetById implements ICompanyGetById {
  @inject("ICompanyRepository")
  _companyRepository?: ICompanyRepository;

  async ExecuteAsync(id: string) {
    const company = await this._companyRepository?.getById(id)!;
    if (company === null) {
      throw new Error(Messages.NotFound("Company"));
    }
    return new CompanyDto(company);
  }
}

import { ICompanyRepository } from "@application/interface/repository/webeditor";
import { ICompanyDelete } from "@application/interface/usecase/webeditor/company";
import { Messages } from "@application/messages/Messages";
import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";
import { inject } from "@infra/di/Inject";

export class CompanyDelete implements ICompanyDelete {
  @inject("ICompanyRepository")
  _companyRepository?: ICompanyRepository;

  async executeAsync(id: string) {
    const company = await this._companyRepository?.getByIdAsync(id)!;
    if (company === null) {
      throw new Error(Messages.notFound("Company"));
    }
    await this._companyRepository?.deleteAsync(company, new Date());
    return new CompanyDto(company);
  }
}

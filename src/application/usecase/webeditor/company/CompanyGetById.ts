import { ICompanyRepository } from "@application/interface/repository/webeditor";
import { ICompanyGetById } from "@application/interface/usecase/webeditor/company";
import { Messages } from "@application/messages/Messages";
import { CompanyDto } from "@domain/dto/webeditor";
import { inject } from "@infra/di";

export class CompanyGetById implements ICompanyGetById {
  @inject("ICompanyRepository")
  _companyRepository?: ICompanyRepository;

  async executeAsync(id: string) {
    const company = await this._companyRepository?.getByIdAsync(id)!;
    if (company === null) {
      throw new Error(Messages.notFound("Company"));
    }
    return new CompanyDto(company);
  }
}

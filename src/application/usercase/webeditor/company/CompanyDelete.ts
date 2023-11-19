import { ICompanyRepository } from "@application/interface/repository/webeditor/ICompanyRepository";
import { ICompanyDelete } from "@application/interface/usercase/webeditor/company/ICompanyDelete";
import { Messages } from "@application/messages/Messages";
import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";

export class CompanyDelete implements ICompanyDelete {
  constructor(readonly _companyRepository: ICompanyRepository) {}

  async ExecuteAsync(id: string) {
    const company = await this._companyRepository.getById(id);
    if (company === null) {
      throw new Error(Messages.NotFound("Company"));
    }
    await this._companyRepository.delete(company, new Date());
    return new CompanyDto(company);
  }
}

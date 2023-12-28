import { ICompanyRepository } from "@application/interface/repository/webeditor";
import { ICompanyDelete } from "@application/interface/usecase/webeditor/company";
import { Messages } from "@application/messages/Messages";
import { CompanyDto } from "@domain/dto/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class CompanyDelete implements ICompanyDelete {
  constructor(
    @inject("ICompanyRepository")
    readonly _companyRepository: ICompanyRepository,
  ) {}

  async executeAsync(id: string) {
    const company = await this._companyRepository.getByIdAsync(id)!;
    if (company === null) {
      throw new Error(Messages.notFound("Company"));
    }
    await this._companyRepository.deleteAsync(company, new Date());
    return new CompanyDto(company);
  }
}

import { ICompanyRepository } from "@application/interface/repository/webeditor";
import { ICompanyGetAll } from "@application/interface/usecase/webeditor/company";
import { GetAllCompanyFilterModel } from "@application/model/webeditor/company";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { CompanyDto } from "@domain/dto/webeditor";
import { Company } from "@domain/entity/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class CompanyGetAll implements ICompanyGetAll {
  constructor(
    @inject("ICompanyRepository")
    readonly _companyRepository: ICompanyRepository,
  ) {}

  async executeAsync(model: GetAllCompanyFilterModel) {
    const { itens: companies, total } =
      await this._companyRepository.getAllAsync(model)!;

    const companiesDto = companies.map(
      (company: Company) => new CompanyDto(company)
    );
    return new PaginatorResultDto(companiesDto, total);
  }
}

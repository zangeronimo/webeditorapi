import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { ICompanyGetAll } from "@application/interface/usercase/webeditor/company/ICompanyGetAll";
import { ICompanyRepository } from "@application/interface/repository/webeditor/ICompanyRepository";
import { GetAllCompanyFilterModel } from "@application/model/webeditor/company/GetAllCompanyFilterModel";
import { Company } from "@domain/entity/Company";
import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";

export class CompanyGetAll implements ICompanyGetAll {
  constructor(readonly _companyRepository: ICompanyRepository) {}

  async ExecuteAsync(model: GetAllCompanyFilterModel) {
    const { itens: companies, total } = await this._companyRepository.getAll(
      model
    );

    const companiesDto = companies.map(
      (company: Company) => new CompanyDto(company)
    );
    return new PaginatorResultDto(companiesDto, total);
  }
}

import { ICompanyRepository } from "@application/interface/repository/webeditor/ICompanyRepository";
import { ICompanyGetAll } from "@application/interface/usecase/webeditor/company/ICompanyGetAll";
import { GetAllCompanyFilterModel } from "@application/model/webeditor/company/GetAllCompanyFilterModel";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";
import { Company } from "@domain/entity/webeditor/Company";
import { inject } from "@infra/di/Inject";

export class CompanyGetAll implements ICompanyGetAll {
  @inject("ICompanyRepository")
  _companyRepository?: ICompanyRepository;

  async executeAsync(model: GetAllCompanyFilterModel) {
    const { itens: companies, total } =
      await this._companyRepository?.getAllAsync(model)!;

    const companiesDto = companies.map(
      (company: Company) => new CompanyDto(company)
    );
    return new PaginatorResultDto(companiesDto, total);
  }
}

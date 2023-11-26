import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { ICompanyGetAll } from "@application/interface/usecase/webeditor/company/ICompanyGetAll";
import { ICompanyRepository } from "@application/interface/repository/webeditor/ICompanyRepository";
import { GetAllCompanyFilterModel } from "@application/model/webeditor/company/GetAllCompanyFilterModel";
import { Company } from "@domain/entity/webeditor/Company";
import { CompanyDto } from "@domain/dto/webeditor/CompanyDto";
import { inject } from "@infra/di/Inject";

export class CompanyGetAll implements ICompanyGetAll {
  @inject("ICompanyRepository")
  _companyRepository?: ICompanyRepository;

  async ExecuteAsync(model: GetAllCompanyFilterModel) {
    const { itens: companies, total } = await this._companyRepository?.getAll(
      model
    )!;

    const companiesDto = companies.map(
      (company: Company) => new CompanyDto(company)
    );
    return new PaginatorResultDto(companiesDto, total);
  }
}

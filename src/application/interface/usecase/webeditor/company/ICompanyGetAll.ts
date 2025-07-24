import { GetAllCompanyFilterModel } from "@application/model/webeditor/company";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { CompanyDto } from "@domain/dto/webeditor";

export interface ICompanyGetAll {
  executeAsync(
    model: GetAllCompanyFilterModel
  ): Promise<PaginatorResultDto<CompanyDto[]>>;
}

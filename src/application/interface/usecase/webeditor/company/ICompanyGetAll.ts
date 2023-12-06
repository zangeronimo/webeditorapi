import { GetAllCompanyFilterModel } from "@application/model/webeditor/company/GetAllCompanyFilterModel";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface ICompanyGetAll {
  executeAsync(model: GetAllCompanyFilterModel): Promise<PaginatorResultDto>;
}

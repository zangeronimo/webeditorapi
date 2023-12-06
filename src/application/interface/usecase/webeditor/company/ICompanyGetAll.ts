import { GetAllCompanyFilterModel } from "@application/model/webeditor/company";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface ICompanyGetAll {
  executeAsync(model: GetAllCompanyFilterModel): Promise<PaginatorResultDto>;
}

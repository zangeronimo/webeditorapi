import { GetAllModuleFilterModel } from "@application/model/webeditor/module";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IModuleGetAll {
  executeAsync(model: GetAllModuleFilterModel): Promise<PaginatorResultDto>;
}

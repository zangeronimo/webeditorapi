import { GetAllModuleFilterModel } from "@application/model/webeditor/module/GetAllModuleFilterModel";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IModuleGetAll {
  executeAsync(model: GetAllModuleFilterModel): Promise<PaginatorResultDto>;
}

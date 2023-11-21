import { GetAllModuleFilterModel } from "@application/model/webeditor/module/GetAllModuleFilterModel";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IModuleGetAll {
  ExecuteAsync(model: GetAllModuleFilterModel): Promise<PaginatorResultDto>;
}

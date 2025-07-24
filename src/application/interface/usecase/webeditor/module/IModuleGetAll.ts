import { GetAllModuleFilterModel } from "@application/model/webeditor/module";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { ModuleDto } from "@domain/dto/webeditor";

export interface IModuleGetAll {
  executeAsync(
    model: GetAllModuleFilterModel
  ): Promise<PaginatorResultDto<ModuleDto[]>>;
}

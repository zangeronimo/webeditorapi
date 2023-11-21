import { ModuleUpdateDataModel } from "@application/model/webeditor/module/ModuleUpdateModel";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";

export interface IModuleUpdate {
  ExecuteAsync(moduleData: ModuleUpdateDataModel): Promise<ModuleDto>;
}

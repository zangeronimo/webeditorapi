import { ModuleUpdateDataModel } from "@application/model/webeditor/module/ModuleUpdateModel";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";

export interface IModuleUpdate {
  executeAsync(moduleData: ModuleUpdateDataModel): Promise<ModuleDto>;
}

import { ModuleUpdateDataModel } from "@application/model/webeditor/module";
import { ModuleDto } from "@domain/dto/webeditor";

export interface IModuleUpdate {
  executeAsync(moduleData: ModuleUpdateDataModel): Promise<ModuleDto>;
}

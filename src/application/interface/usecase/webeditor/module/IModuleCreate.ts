import { ModuleCreateDataModel } from "@application/model/webeditor/module";
import { ModuleDto } from "@domain/dto/webeditor";

export interface IModuleCreate {
  executeAsync(moduleData: ModuleCreateDataModel): Promise<ModuleDto>;
}

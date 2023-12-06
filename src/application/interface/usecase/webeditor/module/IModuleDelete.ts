import { ModuleDto } from "@domain/dto/webeditor";

export interface IModuleDelete {
  executeAsync(id: string): Promise<ModuleDto>;
}

import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";

export interface IModuleDelete {
  executeAsync(id: string): Promise<ModuleDto>;
}

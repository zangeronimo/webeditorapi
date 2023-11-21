import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";

export interface IModuleDelete {
  ExecuteAsync(id: string): Promise<ModuleDto>;
}

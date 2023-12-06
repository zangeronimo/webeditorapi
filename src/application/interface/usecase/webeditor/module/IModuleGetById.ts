import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";

export interface IModuleGetById {
  executeAsync(id: string): Promise<ModuleDto>;
}

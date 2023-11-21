import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";

export interface IModuleGetById {
  ExecuteAsync(id: string): Promise<ModuleDto>;
}

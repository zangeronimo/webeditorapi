import { ModuleDto } from "@domain/dto/webeditor";

export interface IModuleGetById {
  executeAsync(id: string): Promise<ModuleDto>;
}

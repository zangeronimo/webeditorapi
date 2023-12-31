import { GetAllModuleFilterModel } from "@application/model/webeditor/module";
import { Module } from "@domain/entity/webeditor";

export interface IModuleRepository {
  getAllByCompanyAsync(companyId: string): Promise<Module[]>;
  getByIdAsync(id: string): Promise<Module | null>;
  getByNameAsync(name: string): Promise<Module | null>;
  getAllAsync(
    model: GetAllModuleFilterModel
  ): Promise<{ itens: Module[]; total: number }>;
  updateAsync(module: Module): Promise<Module>;
  saveAsync(module: Module): Promise<Module>;
  deleteAsync(module: Module, date: Date): Promise<Module>;
}

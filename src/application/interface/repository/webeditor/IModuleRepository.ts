import { GetAllModuleFilterModel } from "@application/model/webeditor/module/GetAllModuleFilterModel";
import { Module } from "@domain/entity/webeditor/Module";

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

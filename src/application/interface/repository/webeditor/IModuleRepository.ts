import { GetAllModuleFilterModel } from "@application/model/webeditor/module/GetAllModuleFilterModel";
import { Module } from "@domain/entity/Module";

export interface IModuleRepository {
  getById(id: string): Promise<Module | null>;
  getByName(name: string): Promise<Module | null>;
  getAll(
    model: GetAllModuleFilterModel
  ): Promise<{ itens: Module[]; total: number }>;
  update(module: Module): Promise<Module>;
  save(module: Module): Promise<Module>;
  delete(module: Module, date: Date): Promise<Module>;
}

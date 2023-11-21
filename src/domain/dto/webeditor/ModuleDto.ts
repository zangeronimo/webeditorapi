import { Module } from "@domain/entity/Module";

export class ModuleDto {
  public Id: string;
  public Name: string;

  constructor(module: Module) {
    this.Id = module.id;
    this.Name = module.name;
  }
}

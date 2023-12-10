import { Module } from "@domain/entity/webeditor";

export class ModuleDto {
  id: string;
  name: string;

  constructor(module: Module) {
    this.id = module?.id;
    this.name = module?.name;
  }
}

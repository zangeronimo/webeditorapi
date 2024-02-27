import { Module } from "@domain/entity/webeditor";
import { DtoBase } from "../DtoBase";

export class ModuleDto extends DtoBase {
  name: string;

  constructor(module: Module) {
    super(module.id, module.createdAt, module.updatedAt);
    this.name = module?.name;
  }
}

import { Role } from "@domain/entity/webeditor/Role";
import { ModuleDto } from "./ModuleDto";

export class RoleDto {
  id: string;
  name: string;
  label: string;
  order: number;
  module?: ModuleDto;

  constructor(role: Role, module?: ModuleDto) {
    this.id = role.id;
    this.name = role.name;
    this.label = role.label;
    this.order = role.order;
    this.module = module;
  }
}

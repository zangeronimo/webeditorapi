import { Role } from "@domain/entity/webeditor";
import { ModuleDto } from "./ModuleDto";
import { DtoBase } from "../DtoBase";

export class RoleDto extends DtoBase {
  name: string;
  label: string;
  order: number;
  module?: ModuleDto;

  constructor(role: Role, module?: ModuleDto) {
    super(role.id, role.createdAt, role.updatedAt);
    this.name = role?.name;
    this.label = role?.label;
    this.order = role?.order;
    this.module = module;
  }
}

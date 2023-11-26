import { Role } from "@domain/entity/webeditor/Role";
import { ModuleDto } from "./ModuleDto";

export class RoleDto {
  public Id: string;
  public Name: string;
  public Label: string;
  public Order: number;
  public Module: ModuleDto;

  constructor(role: Role, module: ModuleDto) {
    this.Id = role.id;
    this.Name = role.name;
    this.Label = role.label;
    this.Order = role.order;
    this.Module = module;
  }
}

import { Role } from "@domain/entity/webeditor/Role";

export class RoleDto {
  public Id: string;
  public Name: string;
  public Label: string;
  public Order: number;

  constructor(role: Role) {
    this.Id = role.id;
    this.Name = role.name;
    this.Label = role.label;
    this.Order = role.order;
  }
}

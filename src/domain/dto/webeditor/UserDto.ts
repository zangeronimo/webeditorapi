import { User } from "@domain/entity/webeditor/User";
import { RoleDto } from "./RoleDto";

export class UserDto {
  public Id: string;
  public Name: string;
  public Email: string;
  public Roles: RoleDto[];

  constructor(user: User) {
    this.Id = user.id;
    this.Name = user.name;
    this.Email = user.email;
    this.Roles = user.roles.map((role) => new RoleDto(role));
  }
}

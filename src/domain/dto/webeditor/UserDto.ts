import { User } from "@domain/entity/webeditor";
import { RoleDto } from "./RoleDto";

export class UserDto {
  id: string;
  name: string;
  email: string;
  roles: RoleDto[];

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.roles = user.roles.map((role) => new RoleDto(role));
  }
}

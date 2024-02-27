import { User } from "@domain/entity/webeditor";
import { RoleDto } from "./RoleDto";
import { DtoBase } from "../DtoBase";

export class UserDto extends DtoBase {
  name: string;
  email: string;
  roles: RoleDto[];

  constructor(user: User) {
    super(user.id, user.createdAt, user.updatedAt);
    this.name = user?.name;
    this.email = user?.email;
    this.roles = user?.roles?.map((role) => new RoleDto(role));
  }
}

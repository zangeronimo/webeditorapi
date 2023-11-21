import { Role } from "@domain/entity/webeditor/Role";

export class UserUpdateDataModel {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly roles: Role[]
  ) {}
}

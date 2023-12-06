import { Role } from "@domain/entity/webeditor";

export class UserCreateDataModel {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly roles: Role[]
  ) {}
}

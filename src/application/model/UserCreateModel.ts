import { Role } from "@domain/entity/Role";

export class UserCreateDataModel {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly roles: Role[]
  ) {}
}

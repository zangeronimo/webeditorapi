export class UserCreateDataModel {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string
  ) {}
}

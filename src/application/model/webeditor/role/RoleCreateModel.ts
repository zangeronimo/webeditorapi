export class RoleCreateDataModel {
  constructor(
    readonly name: string,
    readonly label: string,
    readonly order: number,
    readonly moduleId: string
  ) {}
}

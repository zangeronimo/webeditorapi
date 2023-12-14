export class PbiStatusCreateDataModel {
  constructor(
    readonly name: string,
    readonly sortOrder: number,
    readonly status: number,
    readonly clientId: string
  ) {}
}

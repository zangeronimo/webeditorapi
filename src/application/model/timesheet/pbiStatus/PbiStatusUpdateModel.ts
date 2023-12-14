export class PbiStatusUpdateDataModel {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly sortOrder: number,
    readonly status: number,
    readonly clientId: string
  ) {}
}

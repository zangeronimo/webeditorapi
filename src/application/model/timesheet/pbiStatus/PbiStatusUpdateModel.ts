export class PbiStatusUpdateDataModel {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly order: number,
    readonly status: number
  ) {}
}

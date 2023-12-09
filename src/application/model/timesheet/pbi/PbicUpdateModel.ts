export class PbiUpdateDataModel {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly status: number,
    readonly epicId: string
  ) {}
}

export class PbiCreateDataModel {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly status: number,
    readonly epicId: string
  ) {}
}

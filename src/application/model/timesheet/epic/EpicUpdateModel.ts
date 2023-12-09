export class EpicUpdateDataModel {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly status: number,
    readonly projectId: string
  ) {}
}

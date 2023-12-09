export class EpicCreateDataModel {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly status: number,
    readonly projectId: string
  ) {}
}

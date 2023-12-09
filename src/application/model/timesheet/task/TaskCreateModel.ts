export class TaskCreateDataModel {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly status: number,
    readonly pbiId: string
  ) {}
}

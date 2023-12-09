export class TaskUpdateDataModel {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly status: number,
    readonly pbiId: string
  ) {}
}

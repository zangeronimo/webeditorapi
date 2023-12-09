export class ProjectUpdateDataModel {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly status: number
  ) {}
}

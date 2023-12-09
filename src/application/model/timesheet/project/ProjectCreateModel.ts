export class ProjectCreateDataModel {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly status: number,
    readonly clientId: string
  ) {}
}

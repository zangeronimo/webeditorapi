export class DtoBase {
  constructor(
    readonly id: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}

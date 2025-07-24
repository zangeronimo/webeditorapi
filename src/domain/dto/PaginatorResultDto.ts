export class PaginatorResultDto<T> {
  constructor(readonly itens: T, readonly total: number) {}
}

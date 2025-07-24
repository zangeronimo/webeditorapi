import { IPagination } from "@application/interface/IPagination";

export class RecipeMostAccessedModel implements IPagination {
  public page: number;
  public pageSize: number;

  constructor(query: any) {
    this.page = query.page;
    this.pageSize = query.pageSize;
  }
}

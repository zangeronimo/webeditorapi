import { PaginatorModel } from "./PaginatorModel";

export class GetAllUserFilterModel extends PaginatorModel {
  public company: string;

  constructor(query: any, company: string) {
    super(query.page, query.pageSize);
    this.company = company;
  }
}

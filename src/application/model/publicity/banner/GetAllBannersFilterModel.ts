import { IOrdenation } from "@application/interface/IOrdenation";
import { IPagination } from "@application/interface/IPagination";

export class GetAllBannersFilterModel implements IPagination, IOrdenation {
  public page: number;
  public pageSize: number;
  public orderBy: string;
  public desc: boolean;
  public title: string;
  public categoryId: string;
  public active: number;

  constructor(query: any) {
    this.page = query.page;
    this.pageSize = query.pageSize;
    this.orderBy = query.orderBy ?? "updated_at";
    this.desc = query.desc === "true" ? true : !query.desc ? true : false;
    this.title = query.title;
    this.categoryId = query.categoryId;
    this.active = query.active;
  }
}

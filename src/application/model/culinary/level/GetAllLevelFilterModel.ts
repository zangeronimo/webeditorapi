import { IOrdenation } from "@application/interface/IOrdenation";
import { IPagination } from "@application/interface/IPagination";

export class GetAllLevelFilterModel implements IPagination, IOrdenation {
  public page: number;
  public pageSize: number;
  public orderBy: string;
  public desc: boolean;
  public name: string;
  public slug: string;
  public active: number;

  constructor(query: any) {
    this.page = query.page;
    this.pageSize = query.pageSize;
    this.orderBy = query.orderBy ?? "name";
    this.desc = query.desc === "true";
    this.name = query.name;
    this.slug = query.slug;
    this.active = query.active;
  }
}

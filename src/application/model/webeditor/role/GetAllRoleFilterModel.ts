import { IOrdenation } from "../../../interface/IOrdenation";
import { IPagination } from "../../../interface/IPagination";

export class GetAllRoleFilterModel implements IPagination, IOrdenation {
  public page: number;
  public pageSize: number;
  public orderBy: string;
  public desc: boolean;
  public name: string;
  public label: string;

  constructor(query: any) {
    this.page = query.page;
    this.pageSize = query.pageSize;
    this.orderBy = query.orderBy ?? "sort_order";
    this.desc = query.desc === "true";
    this.name = query.name;
    this.label = query.label;
  }
}

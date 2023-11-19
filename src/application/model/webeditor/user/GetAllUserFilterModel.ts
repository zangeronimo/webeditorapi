import { IOrdenation } from "../../../interface/IOrdenation";
import { IPagination } from "../../../interface/IPagination";

export class GetAllUserFilterModel implements IPagination, IOrdenation {
  public page: number;
  public pageSize: number;
  public orderBy: string;
  public desc: boolean;
  public name: string;
  public email: string;

  constructor(query: any) {
    this.page = query.page;
    this.pageSize = query.pageSize;
    this.orderBy = query.orderBy ?? "id";
    this.desc = query.desc === "true";
    this.name = query.name;
    this.email = query.email;
  }
}

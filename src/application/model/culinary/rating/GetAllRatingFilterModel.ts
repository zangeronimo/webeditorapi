import { IOrdenation } from "@application/interface/IOrdenation";
import { IPagination } from "@application/interface/IPagination";

export class GetAllRatingFilterModel implements IPagination, IOrdenation {
  public page: number;
  public pageSize: number;
  public orderBy: string;
  public desc: boolean;
  public name: string;
  public active: number;
  public recipeId: string;

  constructor(query: any) {
    this.page = query.page;
    this.pageSize = query.pageSize;
    this.orderBy = query.orderBy ?? "active";
    this.desc = query.desc === "true" ? true : !query.desc ? true : false;
    this.name = query.name;
    this.active = query.active;
    this.recipeId = query.recipeId;
  }
}

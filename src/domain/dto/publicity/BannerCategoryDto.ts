import { DtoBase } from "../DtoBase";
import { BannerCategory } from "@domain/entity/publicity";

export class BannerCategoryDto extends DtoBase {
  name: string;
  active: number;

  constructor(category: BannerCategory) {
    super(category.id, category.createdAt, category.updatedAt);
    this.name = category.name;
    this.active = category.active.valueOf();
  }
}

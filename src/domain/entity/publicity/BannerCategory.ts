import {
  BannerCategoryCreateDataModel,
  BannerCategoryUpdateDataModel,
} from "@application/model/publicity/bannerCategory";
import { ActiveEnum } from "@domain/enum";
import { EntityBase } from "../EntityBase";

export class BannerCategory extends EntityBase {
  private _name: string;
  private _active: ActiveEnum;

  get name() {
    return this._name;
  }
  get active() {
    return this._active;
  }

  private constructor(
    name: string,
    active: ActiveEnum,
    companyId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(companyId, id, createdAt, updatedAt);
    this._name = name;
    this._active = active;
  }

  static restore(
    id: string,
    name: string,
    active: ActiveEnum,
    companyId: string,
    createdAt: Date,
    updatedAt: Date
  ): BannerCategory {
    return new BannerCategory(
      name,
      active,
      companyId,
      id,
      createdAt,
      updatedAt
    );
  }

  static create(
    categoryData: BannerCategoryCreateDataModel,
    companyId: string
  ): BannerCategory {
    const banner = new BannerCategory(
      categoryData.name,
      categoryData.active,
      companyId
    );
    return banner;
  }

  update(categoryData: BannerCategoryUpdateDataModel) {
    this.updateBase();
    this._name = categoryData.name;
    this._active = categoryData.active;
  }
}

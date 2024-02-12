import { ActiveEnum } from "@domain/enum";
import { EntityBase } from "../EntityBase";
import {
  BannerCreateDataModel,
  BannerUpdateDataModel,
} from "@application/model/publicity";

export class Banner extends EntityBase {
  private _title: string;
  private _url: string;
  private _order: number;
  private _active: ActiveEnum;

  get title() {
    return this._title;
  }
  get url() {
    return this._url;
  }
  get order() {
    return this._order;
  }
  get active() {
    return this._active;
  }

  private constructor(
    title: string,
    url: string,
    order: number,
    active: ActiveEnum,
    companyId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(companyId, id, createdAt, updatedAt);
    this._title = title;
    this._url = url;
    this._order = order;
    this._active = active;
  }

  static restore(
    id: string,
    title: string,
    url: string,
    order: number,
    active: ActiveEnum,
    companyId: string,
    createdAt: Date,
    updatedAt: Date
  ): Banner {
    return new Banner(
      title,
      url,
      order,
      active,
      companyId,
      id,
      createdAt,
      updatedAt
    );
  }

  static create(bannerData: BannerCreateDataModel, companyId: string): Banner {
    const banner = new Banner(
      bannerData.title,
      bannerData.url,
      bannerData.order,
      bannerData.active,
      companyId
    );
    return banner;
  }

  update(bannerData: BannerUpdateDataModel) {
    this.updateBase();
    this._title = bannerData.title;
    this._url = bannerData.url;
    this._order = bannerData.order;
    this._active = bannerData.active;
  }
}

import {
  BannerCreateDataModel,
  BannerUpdateDataModel,
} from "@application/model/publicity/banner";
import { ActiveEnum } from "@domain/enum";
import { EntityBase } from "../EntityBase";

export class Banner extends EntityBase {
  private _title: string;
  private _url: string;
  private _image: string;
  private _order: number;
  private _active: ActiveEnum;
  private _bannerCategory: string;

  get title() {
    return this._title;
  }
  get url() {
    return this._url;
  }
  get image() {
    return this._image;
  }
  get order() {
    return this._order;
  }
  get active() {
    return this._active;
  }
  get bannerCategory() {
    return this._bannerCategory;
  }

  private constructor(
    title: string,
    url: string,
    image: string,
    order: number,
    active: ActiveEnum,
    bannerCategory: string,
    companyId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    readonly views?: number,
    readonly clicks?: number
  ) {
    super(companyId, id, createdAt, updatedAt);
    this._title = title;
    this._url = url;
    this._image = image;
    this._order = order;
    this._active = active;
    this._bannerCategory = bannerCategory;
  }

  static restore(
    id: string,
    title: string,
    url: string,
    image: string,
    order: number,
    active: ActiveEnum,
    companyId: string,
    bannerCategory: string,
    createdAt: Date,
    updatedAt: Date,
    views: number,
    clicks: number
  ): Banner {
    return new Banner(
      title,
      url,
      image,
      order,
      active,
      bannerCategory,
      companyId,
      id,
      createdAt,
      updatedAt,
      views,
      clicks
    );
  }

  static create(
    bannerData: BannerCreateDataModel,
    image: string,
    companyId: string
  ): Banner {
    const banner = new Banner(
      bannerData.title,
      bannerData.url,
      image,
      bannerData.order,
      bannerData.active,
      bannerData.bannerCategory,
      companyId
    );
    return banner;
  }

  update(bannerData: BannerUpdateDataModel, image: string) {
    this.updateBase();
    this._title = bannerData.title;
    this._url = bannerData.url;
    this._image = image;
    this._order = bannerData.order;
    this._active = bannerData.active;
    this._bannerCategory = bannerData.bannerCategory;
  }
}

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
  private _active: ActiveEnum;
  private _views?: number;
  private _clicks?: number;
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
  get active() {
    return this._active;
  }
  get views() {
    return this._views;
  }
  get clicks() {
    return this._clicks;
  }
  get bannerCategory() {
    return this._bannerCategory;
  }

  private constructor(
    title: string,
    url: string,
    image: string,
    active: ActiveEnum,
    bannerCategory: string,
    companyId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    views?: number,
    clicks?: number
  ) {
    super(companyId, id, createdAt, updatedAt);
    this._title = title;
    this._url = url;
    this._image = image;
    this._active = active;
    this._views = views;
    this._clicks = clicks;
    this._bannerCategory = bannerCategory;
  }

  static restore(
    id: string,
    title: string,
    url: string,
    image: string,
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
    this._active = bannerData.active;
    this._bannerCategory = bannerData.bannerCategory;
  }

  setView() {
    if (!this._views) this._views = 0;
    ++this._views;
  }

  setClick() {
    if (!this._clicks) this._clicks = 0;
    ++this._clicks;
  }
}

import { Banner, BannerCategory } from "@domain/entity/publicity";
import { DtoBase } from "../DtoBase";
import { BannerCategoryDto } from "./BannerCategoryDto";

export class BannerDto extends DtoBase {
  title: string;
  url: string;
  order: number;
  active: number;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  clicks: number;
  bannerCategory?: BannerCategoryDto;

  constructor(banner: Banner, category?: BannerCategory) {
    super(banner.id, banner.createdAt, banner.updatedAt);
    this.title = banner.title;
    this.url = banner.url;
    this.order = banner.order;
    this.active = banner.active.valueOf();
    this.createdAt = banner.createdAt;
    this.updatedAt = banner.updatedAt;
    this.views = banner.views ?? 0;
    this.clicks = banner.clicks ?? 0;
    this.bannerCategory = category;
  }
}

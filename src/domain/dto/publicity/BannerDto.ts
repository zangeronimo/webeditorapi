import { Banner, BannerCategory } from "@domain/entity/publicity";
import { DtoBase } from "../DtoBase";
import { BannerCategoryDto } from "./BannerCategoryDto";

export class BannerDto extends DtoBase {
  title: string;
  url: string;
  image: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  clicks: number;
  categoryId: string;
  bannerCategory?: BannerCategoryDto;

  constructor(banner: Banner, category?: BannerCategory) {
    super(banner.id, banner.createdAt, banner.updatedAt);
    this.title = banner.title;
    this.url = banner.url;
    this.image = banner.image;
    this.active = banner.active.valueOf();
    this.createdAt = banner.createdAt;
    this.updatedAt = banner.updatedAt;
    this.views = banner.views ?? 0;
    this.clicks = banner.clicks ?? 0;
    this.categoryId = banner.bannerCategory;
    this.bannerCategory = category;
  }
}

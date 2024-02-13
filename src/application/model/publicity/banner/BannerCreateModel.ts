export class BannerCreateDataModel {
  constructor(
    readonly title: string,
    readonly url: string,
    readonly order: number,
    readonly active: number,
    readonly bannerCategory: string,
    readonly imageUpload?: string
  ) {}
}

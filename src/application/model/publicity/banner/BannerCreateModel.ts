export class BannerCreateDataModel {
  constructor(
    readonly title: string,
    readonly url: string,
    readonly active: number,
    readonly bannerCategory: string,
    readonly imageUpload?: string
  ) {}
}

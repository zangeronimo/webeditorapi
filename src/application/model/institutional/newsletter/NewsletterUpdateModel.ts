export class NewsletterUpdateDataModel {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly active: number
  ) {}
}

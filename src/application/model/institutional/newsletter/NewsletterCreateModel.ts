export class NewsletterCreateDataModel {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly active: number
  ) {}
}

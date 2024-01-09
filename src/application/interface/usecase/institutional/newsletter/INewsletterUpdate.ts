import { NewsletterUpdateDataModel } from "@application/model/institutional/newsletter";
import { NewsletterDto } from "@domain/dto/institutional";

export interface INewsletterUpdate {
  executeAsync(
    newsletterData: NewsletterUpdateDataModel,
    company: string
  ): Promise<NewsletterDto>;
}

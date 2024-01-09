import { NewsletterCreateDataModel } from "@application/model/institutional/newsletter";
import { NewsletterDto } from "@domain/dto/institutional";

export interface INewsletterCreate {
  executeAsync(
    newsletterData: NewsletterCreateDataModel,
    company: string
  ): Promise<NewsletterDto>;
}

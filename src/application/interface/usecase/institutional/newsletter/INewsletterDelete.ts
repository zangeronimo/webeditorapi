import { NewsletterDto } from "@domain/dto/institutional";

export interface INewsletterDelete {
  executeAsync(id: string, company: string): Promise<NewsletterDto>;
}

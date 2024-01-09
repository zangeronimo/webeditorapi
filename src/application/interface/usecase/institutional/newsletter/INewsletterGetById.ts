import { NewsletterDto } from "@domain/dto/institutional";

export interface INewsletterGetById {
  executeAsync(id: string, company: string): Promise<NewsletterDto>;
}

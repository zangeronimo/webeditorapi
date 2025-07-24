import { GetAllNewsletterFilterModel } from "@application/model/institutional/newsletter";
import { NewsletterDto } from "@domain/dto/institutional";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface INewsletterGetAll {
  executeAsync(
    model: GetAllNewsletterFilterModel,
    company: string
  ): Promise<PaginatorResultDto<NewsletterDto[]>>;
}

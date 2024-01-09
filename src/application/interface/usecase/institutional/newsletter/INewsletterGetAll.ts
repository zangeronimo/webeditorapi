import { GetAllNewsletterFilterModel } from "@application/model/institutional/newsletter";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface INewsletterGetAll {
  executeAsync(
    model: GetAllNewsletterFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}

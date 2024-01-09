import { INewsletterRepository } from "@application/interface/repository/institutional";
import { INewsletterGetAll } from "@application/interface/usecase/institutional/newsletter";
import { GetAllNewsletterFilterModel } from "@application/model/institutional/newsletter";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { NewsletterDto } from "@domain/dto/institutional";
import { Newsletter } from "@domain/entity/institutional";
import { inject, injectable } from "tsyringe";

@injectable()
export class NewsletterGetAll implements INewsletterGetAll {
  constructor(
    @inject("INewsletterRepository")
    readonly _newsletterRepository: INewsletterRepository
  ) {}

  async executeAsync(model: GetAllNewsletterFilterModel, company: string) {
    const { itens: newsletters, total } =
      await this._newsletterRepository.getAllAsync(model, company)!;
    const newslettersDto = newsletters.map(
      (newsletter: Newsletter) => new NewsletterDto(newsletter)
    );
    return new PaginatorResultDto(newslettersDto, total);
  }
}

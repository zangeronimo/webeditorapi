import { INewsletterRepository } from "@application/interface/repository/institutional";
import { INewsletterDelete } from "@application/interface/usecase/institutional/newsletter";
import { Messages } from "@application/messages/Messages";
import { NewsletterDto } from "@domain/dto/institutional";
import { inject, injectable } from "tsyringe";

@injectable()
export class NewsletterDelete implements INewsletterDelete {
  constructor(
    @inject("INewsletterRepository")
    readonly _newsletterRepository: INewsletterRepository
  ) {}

  async executeAsync(id: string, company: string) {
    const newsletter = await this._newsletterRepository.getByIdAsync(
      id,
      company
    )!;
    if (newsletter === null) {
      throw new Error(Messages.notFound("Newsletter"));
    }
    await this._newsletterRepository.deleteAsync(newsletter, new Date());
    return new NewsletterDto(newsletter);
  }
}

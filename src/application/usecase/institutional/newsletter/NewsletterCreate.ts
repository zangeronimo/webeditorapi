import { INewsletterRepository } from "@application/interface/repository/institutional";
import { INewsletterCreate } from "@application/interface/usecase/institutional/newsletter";
import { Messages } from "@application/messages/Messages";
import { NewsletterCreateDataModel } from "@application/model/institutional/newsletter";
import { NewsletterDto } from "@domain/dto/institutional";
import { Newsletter } from "@domain/entity/institutional";
import { inject, injectable } from "tsyringe";

@injectable()
export class NewsletterCreate implements INewsletterCreate {
  constructor(
    @inject("INewsletterRepository")
    readonly _newsletterRepository: INewsletterRepository
  ) {}

  async executeAsync(
    newsletterData: NewsletterCreateDataModel,
    company: string
  ) {
    const newsletter = Newsletter.create(newsletterData, company);
    if (newsletter === null) {
      throw new Error(Messages.notCreated("Newsletter"));
    }
    const emailExists = await this._newsletterRepository.getByEmailAsync(
      newsletter.email!,
      company
    );
    if (emailExists !== null) {
      throw new Error(Messages.alreadyInUse("EMail"));
    }
    await this._newsletterRepository.saveAsync(newsletter);
    return new NewsletterDto(newsletter);
  }
}

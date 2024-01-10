import { INewsletterRepository } from "@application/interface/repository/institutional";
import { INewsletterUpdate } from "@application/interface/usecase/institutional/newsletter";
import { Messages } from "@application/messages/Messages";
import { NewsletterUpdateDataModel } from "@application/model/institutional/newsletter";
import { NewsletterDto } from "@domain/dto/institutional";
import { inject, injectable } from "tsyringe";

@injectable()
export class NewsletterUpdate implements INewsletterUpdate {
  constructor(
    @inject("INewsletterRepository")
    readonly _newsletterRepository: INewsletterRepository
  ) {}

  async executeAsync(
    newsletterData: NewsletterUpdateDataModel,
    company: string
  ) {
    const newsletter = await this._newsletterRepository.getByIdAsync(
      newsletterData.id,
      company
    )!;
    if (newsletter === null) {
      throw new Error(Messages.notFound("Newsletter"));
    }
    if (newsletterData.email !== newsletter.email) {
      const existEmail = await this._newsletterRepository.getByEmailAsync(
        newsletterData.email,
        company
      );
      if (existEmail !== null && existEmail.id !== newsletterData.id) {
        throw new Error(Messages.alreadyInUse("EMail"));
      }
    }
    newsletter.update(newsletterData);
    await this._newsletterRepository.updateAsync(newsletter);
    return new NewsletterDto(newsletter);
  }
}

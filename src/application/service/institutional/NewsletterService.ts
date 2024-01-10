import { INewsletterRepository } from "@application/interface/repository/institutional";
import { INewsletterService } from "@application/interface/service/institutional/INewsletterService";
import { NewsletterCreateDataModel } from "@application/model/institutional/newsletter";
import { Newsletter } from "@domain/entity/institutional";
import { ActiveEnum } from "@domain/enum";
import { inject, injectable } from "tsyringe";

@injectable()
export class NewsletterService implements INewsletterService {
  constructor(
    @inject("INewsletterRepository")
    readonly _recipeRepository: INewsletterRepository
  ) {}

  async createAsync(
    name: string,
    email: string,
    company: string
  ): Promise<void> {
    const emailExists = await this._recipeRepository.getByEmailAsync(
      email,
      company
    );
    if (emailExists) return;

    const model = new NewsletterCreateDataModel(name, email, ActiveEnum.ACTIVE);
    const newsletter = Newsletter.create(model, company);
    await this._recipeRepository.saveAsync(newsletter);
  }
}

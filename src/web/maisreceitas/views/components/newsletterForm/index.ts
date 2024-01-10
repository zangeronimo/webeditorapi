import { NewsletterService } from "@application/service/institutional/NewsletterService";
import pug from "pug";
import { container } from "tsyringe";

export class NewsletterForm {
  readonly newsletterService = container.resolve(NewsletterService);
  readonly company = process.env.MAISRECEITAS!;

  render = (pugFile: string, company: string) => {
    return () =>
      pug.renderFile(pugFile, {
        apiUrl: process.env.MAISRECEITAS_URL,
      });
  };

  createAsync = async (name: string, email: string) => {
    await this.newsletterService.createAsync(name, email, this.company);
  };
}

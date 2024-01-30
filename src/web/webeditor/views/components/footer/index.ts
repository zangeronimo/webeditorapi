import pug from "pug";
import { NewsletterForm } from "../newsletterForm";

export class Footer {
  readonly company = process.env.MAISRECEITAS!;

  render = async (pugFile: string, newsletterFormPugFile: string) => {
    const newsletterForm = new NewsletterForm();
    return () =>
      pug.renderFile(pugFile, {
        newsletterForm: newsletterForm.render(
          newsletterFormPugFile,
          this.company
        ),
        company: this.company,
      });
  };
}

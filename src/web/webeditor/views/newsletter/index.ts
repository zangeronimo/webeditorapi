import { GetAllNewsletterFilterModel } from "@application/model/institutional/newsletter";
import { NewsletterGetAll } from "@application/usecase/institutional/newsletter";
import { container } from "tsyringe";
import { Pug } from "web/webeditor/models/Pug";
import { SEO } from "web/webeditor/models/Seo";
import { Pagination } from "../components/pagination";

export class Newsletter extends Pug {
  readonly getAll = container.resolve(NewsletterGetAll);

  render = async (model: GetAllNewsletterFilterModel, company: string) => {
    const seo = new SEO("WEBEditor - Institucional - Newsletters");
    const newsletters = await this.getAll.executeAsync(model, company);
    const paginationComponent = new Pagination();
    const pagination = await paginationComponent.render(newsletters.total);
    return {
      root: () =>
        this.renderFile("newsletter", {
          newsletters: newsletters.itens,
          pagination,
        }),
      seo,
    };
  };
}

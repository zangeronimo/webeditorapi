import { GetAllNewsletterFilterModel } from "@application/model/institutional/newsletter";
import { NewsletterGetAll } from "@application/usecase/institutional/newsletter";
import { container } from "tsyringe";
import { Pagination } from "../components/pagination";
import { Pug } from "@web/webeditor/models/Pug";
import { SEO } from "@web/webeditor/models/Seo";

export class Newsletter extends Pug {
  readonly getAll = container.resolve(NewsletterGetAll);

  render = async (model: GetAllNewsletterFilterModel, company: string) => {
    const seo = new SEO("WEBEditor - Institucional - Newsletters");
    const newsletters = await this.getAll.executeAsync(model, company);
    const paginationComponent = new Pagination();
    const pagination = await paginationComponent.render(
      newsletters.total,
      model.pageSize,
      model.page
    );
    return {
      root: () =>
        this.renderFile("newsletter", {
          model,
          newsletters: newsletters.itens,
          pagination,
        }),
      seo,
    };
  };
}

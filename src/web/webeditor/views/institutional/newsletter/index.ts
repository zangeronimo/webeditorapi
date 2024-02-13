import { GetAllNewsletterFilterModel } from "@application/model/institutional/newsletter";
import { NewsletterGetAll } from "@application/usecase/institutional/newsletter";
import { container } from "tsyringe";
import { Pagination } from "../../components/pagination";
import { Pug } from "@web/webeditor/models/Pug";
import { SEO } from "@web/webeditor/models/Seo";

export class Newsletter extends Pug {
  readonly getAll = container.resolve(NewsletterGetAll);
  readonly modalId = "_modal_newsletter_edit";
  readonly confirmId = "_confirm_delete_id";

  render = async (model: GetAllNewsletterFilterModel, company: string) => {
    const seo = new SEO("WEBEditor - Institucional - Newsletters");
    const newsletters = await this.getAll.executeAsync(model, company);
    const formEdit = () =>
      this.renderFile("institutional/newsletter/form", {
        modalId: this.modalId,
      });
    const modal = () =>
      this.renderFile("components/modal", {
        id: this.modalId,
        title: "test",
        children: formEdit,
      });
    const confirm = () =>
      this.renderFile("components/confirm", {
        id: this.confirmId,
        title: "Confirme sua ação",
        content: "Deseja realmente remover o registro?",
      });
    const paginationComponent = new Pagination();
    const pagination = await paginationComponent.render(
      newsletters.total,
      model.pageSize,
      model.page
    );
    return {
      root: () =>
        this.renderFile("institutional/newsletter", {
          model,
          modalId: this.modalId,
          confirmId: this.confirmId,
          newsletters: newsletters.itens,
          pagination,
          modal,
          confirm,
        }),
      seo,
    };
  };
}

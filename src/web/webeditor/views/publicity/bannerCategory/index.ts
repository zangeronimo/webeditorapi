import { container } from "tsyringe";
import { Pagination } from "../../components/pagination";
import { Pug } from "@web/webeditor/models/Pug";
import { SEO } from "@web/webeditor/models/Seo";
import { BannerCategoryGetAll } from "@application/usecase/publicity/bannerCategory";
import { GetAllBannersCategoriesFilterModel } from "@application/model/publicity/bannerCategory";

export class BannerCategory extends Pug {
  readonly getAll = container.resolve(BannerCategoryGetAll);
  readonly modalId = "_modal_category_edit";
  readonly confirmId = "_confirm_delete_id";

  render = async (
    model: GetAllBannersCategoriesFilterModel,
    company: string
  ) => {
    const seo = new SEO("WEBEditor - Publicidade - Categorias");
    const categories = await this.getAll.executeAsync(model, company);
    const formEdit = () =>
      this.renderFile("publicity/bannerCategory/form", {
        modalId: this.modalId,
      });
    const modal = () =>
      this.renderFile("components/modal", {
        id: this.modalId,
        title: "Categorias",
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
      categories.total,
      model.pageSize,
      model.page
    );
    return {
      root: () =>
        this.renderFile("publicity/bannerCategory", {
          model,
          modalId: this.modalId,
          confirmId: this.confirmId,
          categories: categories.itens,
          pagination,
          modal,
          confirm,
        }),
      seo,
    };
  };
}

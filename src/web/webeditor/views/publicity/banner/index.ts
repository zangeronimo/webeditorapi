import { GetAllBannersFilterModel } from "@application/model/publicity/banner";
import { BannerGetAll } from "@application/usecase/publicity/banner";
import { BannerCategoryGetAll } from "@application/usecase/publicity/bannerCategory";
import { Pug } from "@web/webeditor/models/Pug";
import { SEO } from "@web/webeditor/models/Seo";
import { container } from "tsyringe";
import { Pagination } from "../../components/pagination";
import { GetAllBannersCategoriesFilterModel } from "@application/model/publicity/bannerCategory";

export class Banner extends Pug {
  readonly getAll = container.resolve(BannerGetAll);
  readonly categorygetAll = container.resolve(BannerCategoryGetAll);
  readonly modalId = "_modal_banner_edit";
  readonly confirmId = "_confirm_delete_id";

  render = async (model: GetAllBannersFilterModel, company: string) => {
    const seo = new SEO("WEBEditor - Publicidade - Banners");
    const banners = await this.getAll.executeAsync(model, company);
    const categoryModel = new GetAllBannersCategoriesFilterModel({});
    categoryModel.page = 1;
    categoryModel.orderBy = "name";
    categoryModel.pageSize = 9999;
    const categories = await this.categorygetAll.executeAsync(
      categoryModel,
      company
    );
    const categoriesSelectData = categories.itens.map((category) => ({
      value: category.id,
      label: category.name,
    }));
    const formEdit = () =>
      this.renderFile("publicity/banner/form", {
        modalId: this.modalId,
        categoriesSelectData,
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
      banners.total,
      model.pageSize,
      model.page
    );
    return {
      root: () =>
        this.renderFile("publicity/banner", {
          model,
          modalId: this.modalId,
          confirmId: this.confirmId,
          banners: banners.itens,
          pagination,
          modal,
          confirm,
          baseUrl: process.env.WEBEDITOR_URL,
        }),
      seo,
    };
  };
}

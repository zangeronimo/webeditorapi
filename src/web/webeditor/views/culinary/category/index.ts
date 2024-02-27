import { GetAllCategoryFilterModel } from "@application/model/culinary/category";
import { CategoryGetAll } from "@application/usecase/culinary/category";
import { LevelGetAll } from "@application/usecase/culinary/level";
import { Pug } from "@web/webeditor/models/Pug";
import { SEO } from "@web/webeditor/models/Seo";
import { container } from "tsyringe";
import { Pagination } from "../../components/pagination";
import { GetAllLevelFilterModel } from "@application/model/culinary/level";

export class Category extends Pug {
  readonly getAll = container.resolve(CategoryGetAll);
  readonly levelGetAll = container.resolve(LevelGetAll);
  readonly modalId = "_modal_category_edit";
  readonly confirmId = "_confirm_delete_id";

  render = async (model: GetAllCategoryFilterModel, company: string) => {
    const seo = new SEO("WEBEditor - Publicidade - Categories");
    const categories = await this.getAll.executeAsync(model, company);
    const levelModel = new GetAllLevelFilterModel({});
    levelModel.page = 1;
    levelModel.orderBy = "name";
    levelModel.pageSize = 9999;
    const levels = await this.levelGetAll.executeAsync(levelModel, company);
    const levelsSelectData = levels.itens.map((level) => ({
      value: level.id,
      label: level.name,
    }));
    const formEdit = () =>
      this.renderFile("culinary/category/form", {
        modalId: this.modalId,
        levelsSelectData,
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
        this.renderFile("culinary/category", {
          model,
          modalId: this.modalId,
          confirmId: this.confirmId,
          categories: categories.itens,
          pagination,
          modal,
          confirm,
          levelsSelectData,
        }),
      seo,
    };
  };
}

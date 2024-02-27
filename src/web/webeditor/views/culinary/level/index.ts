import { container } from "tsyringe";
import { Pagination } from "../../components/pagination";
import { Pug } from "@web/webeditor/models/Pug";
import { SEO } from "@web/webeditor/models/Seo";
import { LevelGetAll } from "@application/usecase/culinary/level";
import { GetAllLevelFilterModel } from "@application/model/culinary/level";

export class Level extends Pug {
  readonly getAll = container.resolve(LevelGetAll);
  readonly modalId = "_modal_category_edit";
  readonly confirmId = "_confirm_delete_id";

  render = async (model: GetAllLevelFilterModel, company: string) => {
    const seo = new SEO("WEBEditor - Publicidade - Levels");
    const levels = await this.getAll.executeAsync(model, company);
    const formEdit = () =>
      this.renderFile("culinary/level/form", {
        modalId: this.modalId,
      });
    const modal = () =>
      this.renderFile("components/modal", {
        id: this.modalId,
        title: "Levels",
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
      levels.total,
      model.pageSize,
      model.page
    );
    return {
      root: () =>
        this.renderFile("culinary/level", {
          model,
          modalId: this.modalId,
          confirmId: this.confirmId,
          levels: levels.itens,
          pagination,
          modal,
          confirm,
        }),
      seo,
    };
  };
}

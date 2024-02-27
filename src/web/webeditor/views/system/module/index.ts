import { container } from "tsyringe";
import { Pagination } from "../../components/pagination";
import { Pug } from "@web/webeditor/models/Pug";
import { SEO } from "@web/webeditor/models/Seo";
import { ModuleGetAll } from "@application/usecase/webeditor/module";
import { GetAllModuleFilterModel } from "@application/model/webeditor/module";

export class Module extends Pug {
  readonly getAll = container.resolve(ModuleGetAll);
  readonly moduleGetAll = container.resolve(ModuleGetAll);
  readonly modalId = "_modal_module_edit";
  readonly confirmId = "_confirm_delete_id";

  render = async (model: GetAllModuleFilterModel) => {
    const seo = new SEO("WEBEditor - Administrador - Módulos");
    const modules = await this.getAll.executeAsync(model);
    const formEdit = () =>
      this.renderFile("system/module/form", {
        modalId: this.modalId,
      });
    const modal = () =>
      this.renderFile("components/modal", {
        id: this.modalId,
        title: "Módulos",
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
      modules.total,
      model.pageSize,
      model.page
    );
    return {
      root: () =>
        this.renderFile("system/module", {
          model,
          modalId: this.modalId,
          confirmId: this.confirmId,
          modules: modules.itens,
          pagination,
          modal,
          confirm,
        }),
      seo,
    };
  };
}

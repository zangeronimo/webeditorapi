import { container } from "tsyringe";
import { Pagination } from "../../components/pagination";
import { Pug } from "@web/webeditor/models/Pug";
import { SEO } from "@web/webeditor/models/Seo";
import { UserGetAll } from "@application/usecase/webeditor/user";
import { GetAllUserFilterModel } from "@application/model/webeditor/user";
import { ModuleGetAllByCompany } from "@application/usecase/webeditor/module";

export class User extends Pug {
  readonly getAll = container.resolve(UserGetAll);
  readonly moduleGetAll = container.resolve(ModuleGetAllByCompany);
  readonly modalId = "_modal_user_edit";
  readonly confirmId = "_confirm_delete_id";

  render = async (model: GetAllUserFilterModel, company: string) => {
    const seo = new SEO("WEBEditor - WEBEditor - Usuários");
    const modules = await this.moduleGetAll.executeAsync(company);
    const users = await this.getAll.executeAsync(model, company);
    const formEdit = () =>
      this.renderFile("system/user/form", {
        modalId: this.modalId,
        modules: modules,
      });
    const modal = () =>
      this.renderFile("components/modal", {
        id: this.modalId,
        title: "Usuários",
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
      users.total,
      model.pageSize,
      model.page
    );
    return {
      root: () =>
        this.renderFile("system/user", {
          model,
          modalId: this.modalId,
          confirmId: this.confirmId,
          users: users.itens,
          pagination,
          modal,
          confirm,
        }),
      seo,
    };
  };
}

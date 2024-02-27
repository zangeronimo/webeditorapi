import { container } from "tsyringe";
import { Pagination } from "../../components/pagination";
import { Pug } from "@web/webeditor/models/Pug";
import { SEO } from "@web/webeditor/models/Seo";
import { RoleGetAll } from "@application/usecase/webeditor/role";
import { GetAllRoleFilterModel } from "@application/model/webeditor/role";
import { ModuleGetAll } from "@application/usecase/webeditor/module";
import { GetAllModuleFilterModel } from "@application/model/webeditor/module";

export class Role extends Pug {
  readonly getAll = container.resolve(RoleGetAll);
  readonly moduleGetAll = container.resolve(ModuleGetAll);
  readonly modalId = "_modal_role_edit";
  readonly confirmId = "_confirm_delete_id";

  render = async (model: GetAllRoleFilterModel) => {
    const seo = new SEO("WEBEditor - Administrador - Regras");
    const modelModule = new GetAllModuleFilterModel("");
    modelModule.page = 1;
    modelModule.pageSize = 99999;
    const modulesResult = await this.moduleGetAll.executeAsync(modelModule);
    const roles = await this.getAll.executeAsync(model);
    const formEdit = () =>
      this.renderFile("system/role/form", {
        modalId: this.modalId,
        modulesSelectData: modulesResult.itens.map((module) => ({
          value: module.id,
          label: module.name,
        })),
      });
    const modal = () =>
      this.renderFile("components/modal", {
        id: this.modalId,
        title: "Regras",
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
      roles.total,
      model.pageSize,
      model.page
    );
    return {
      root: () =>
        this.renderFile("system/role", {
          model,
          modalId: this.modalId,
          confirmId: this.confirmId,
          roles: roles.itens,
          pagination,
          modal,
          confirm,
        }),
      seo,
    };
  };
}

import { container } from "tsyringe";
import { Pagination } from "../../components/pagination";
import { Pug } from "@web/webeditor/models/Pug";
import { SEO } from "@web/webeditor/models/Seo";
import { CompanyGetAll } from "@application/usecase/webeditor/company";
import { GetAllCompanyFilterModel } from "@application/model/webeditor/company";

export class Company extends Pug {
  readonly getAll = container.resolve(CompanyGetAll);
  readonly modalId = "_modal_company_edit";
  readonly confirmId = "_confirm_delete_id";

  render = async (model: GetAllCompanyFilterModel) => {
    const seo = new SEO("WEBEditor - Administrador - Empresas");
    const companies = await this.getAll.executeAsync(model);
    const formEdit = () =>
      this.renderFile("system/company/form", {
        modalId: this.modalId,
      });
    const modal = () =>
      this.renderFile("components/modal", {
        id: this.modalId,
        title: "Empresas",
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
      companies.total,
      model.pageSize,
      model.page
    );
    return {
      root: () =>
        this.renderFile("system/company", {
          model,
          modalId: this.modalId,
          confirmId: this.confirmId,
          companies: companies.itens,
          pagination,
          modal,
          confirm,
        }),
      seo,
    };
  };
}

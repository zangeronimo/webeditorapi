import { GetAllRatingFilterModel } from "@application/model/culinary/rating";
import { container } from "tsyringe";
import { Pagination } from "../../components/pagination";
import { Pug } from "@web/webeditor/models/Pug";
import { SEO } from "@web/webeditor/models/Seo";
import { RatingGetAll } from "@application/usecase/culinary/rating";
import { RecipeDto } from "@domain/dto/culinary";

export class Rating extends Pug {
  readonly getAll = container.resolve(RatingGetAll);
  readonly modalId = "_modal_rating_edit";
  readonly confirmId = "_confirm_delete_id";

  render = async (
    model: GetAllRatingFilterModel,
    recipes: RecipeDto[],
    company: string
  ) => {
    const seo = new SEO("WEBEditor - Culinária - Avaliações");
    const ratings = await this.getAll.executeAsync(model, company);
    const formEdit = () =>
      this.renderFile("culinary/rating/form", {
        modalId: this.modalId,
      });
    const modal = () =>
      this.renderFile("components/modal", {
        id: this.modalId,
        title: "Editar registro",
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
      ratings.total,
      model.pageSize,
      model.page
    );
    const recipesSelectData = recipes.map((recipe) => ({
      value: recipe.id,
      label: recipe.name,
    }));
    return {
      root: () =>
        this.renderFile("culinary/rating", {
          model,
          modalId: this.modalId,
          confirmId: this.confirmId,
          ratings: ratings.itens,
          pagination,
          modal,
          confirm,
          recipesSelectData,
        }),
      seo,
    };
  };
}

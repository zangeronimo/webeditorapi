import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import { RecipeGetAll } from "@application/usecase/culinary/recipe";
import { ActiveEnum } from "@domain/enum";
import { container } from "tsyringe";
import pug from "pug";

export class Dashboard {
  readonly recipeGetAll = container.resolve(RecipeGetAll);
  readonly company = process.env.MAISRECEITAS!;

  render = async (pugFile: string) => {
    const news = await this.getNews();
    return () =>
      pug.renderFile(pugFile, {
        news,
      });
  };

  private getNews = async () => {
    const model = new GetAllRecipeFilterModel("");
    model.active = ActiveEnum.ACTIVE;
    model.orderBy = "created_at";
    model.desc = true;
    model.page = 1;
    model.pageSize = 10;

    const { itens: recipes } = await this.recipeGetAll.executeAsync(
      model,
      this.company
    );

    return recipes;
  };

  private getWithPicture = () => {};
}

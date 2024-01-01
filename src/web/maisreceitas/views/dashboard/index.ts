import { container } from "tsyringe";
import pug from "pug";
import { RecipeService } from "@application/service/culinary/RecipeService";
import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";

export class Dashboard {
  readonly recipeService = container.resolve(RecipeService);
  readonly company = process.env.MAISRECEITAS!;

  render = async (pugFile: string) => {
    const news = await this.getNews(10);
    const withPicture = await this.getWithPicture(12);
    return () =>
      pug.renderFile(pugFile, {
        news,
        withPicture,
        apiUrl: process.env.API_URL,
      });
  };

  private getNews = async (total: number) => {
    const recipes = await this.recipeService.getNewsAsync(total, this.company);
    return recipes;
  };

  private getWithPicture = async (total: number) => {
    const model = new GetAllWithImageFilterModel();
    model.random = true;
    model.total = total;
    const recipes = await this.recipeService.getWithImageAsync(
      model,
      this.company
    );
    return recipes;
  };
}

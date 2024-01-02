import { container } from "tsyringe";
import pug from "pug";
import { RecipeService } from "@application/service/culinary/RecipeService";
import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { RecipeWithImage } from "../components/recipeWithImage";
import { RecipeList } from "../components/recipeList";
import { GetAllRecipesFilterModel } from "@application/model/culinary/recipe/GetAllRecipesFilterModel";

export class Dashboard {
  readonly recipeService = container.resolve(RecipeService);

  render = async (pugFile: string) => {
    const news = await this.getNews(10);
    const recipeWithImage = await this.getWithPicture(12);
    return () =>
      pug.renderFile(pugFile, {
        news,
        recipeWithImage,
        apiUrl: process.env.API_URL,
      });
  };

  private getNews = async (total: number) => {
    const model = new GetAllRecipesFilterModel();
    model.total = total;
    model.orderBy = "created_at desc";
    const recipesNews = new RecipeList();
    const recipes = await recipesNews.render("Novidades", model);
    return recipes;
  };

  private getWithPicture = async (total: number) => {
    const model = new GetAllWithImageFilterModel();
    model.random = true;
    model.total = total;
    const withImage = new RecipeWithImage();
    return await withImage.render(model, "Receitas em Destaque");
  };
}

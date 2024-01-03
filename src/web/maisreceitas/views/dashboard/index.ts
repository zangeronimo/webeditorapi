import { container } from "tsyringe";
import pug from "pug";
import { RecipeService } from "@application/service/culinary/RecipeService";
import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { RecipeWithImage } from "../components/recipeWithImage";
import { RecipeList } from "../components/recipeList";
import { GetAllRecipesFilterModel } from "@application/model/culinary/recipe/GetAllRecipesFilterModel";
import { SeoService } from "@application/service/SeoService";

export class Dashboard {
  readonly recipeService = container.resolve(RecipeService);

  render = async (pugFile: string) => {
    const news = await this.getNews(10);
    const recipeWithImage = await this.getWithPicture(12);
    const seo = new SeoService();
    seo.setTitle("MaisReceitas - Os segredos da culinária ao seu alcance!");
    seo.setDescription(
      "Curta e aproveite as mais deliciosas receitas da internet, isso e muito mais você encontra aqui, confira."
    );
    return {
      root: () =>
        pug.renderFile(pugFile, {
          news,
          recipeWithImage,
          apiUrl: process.env.MAISRECEITAS_URL,
        }),
      seo,
    };
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

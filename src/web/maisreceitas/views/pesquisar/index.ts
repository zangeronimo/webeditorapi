import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { RecipeService } from "@application/service/culinary/RecipeService";
import pug from "pug";
import { container } from "tsyringe";
import { RecipeWithImage } from "../components/recipeWithImage";
import { RecipeList } from "../components/recipeList";
import { GetAllRecipesFilterModel } from "@application/model/culinary/recipe/GetAllRecipesFilterModel";
import { SeoService } from "@application/service/SeoService";

export class Pesquisar {
  readonly recipeService = container.resolve(RecipeService);
  readonly company = process.env.MAISRECEITAS!;

  render = async (pugFile: string, search: string) => {
    const model = new GetAllWithImageFilterModel();
    model.random = false;
    model.total = 6;
    model.search = search;
    const withImage = new RecipeWithImage();
    const recipeWithImage = await withImage.render(model, "");

    const modelList = new GetAllRecipesFilterModel();
    modelList.total = 9999;
    modelList.orderBy = "name";
    modelList.search = search;
    const recipeList = new RecipeList();
    const recipes = await recipeList.render("", modelList);

    const seo = new SeoService();
    seo.setTitle(`Pesquisando por ${search} | MaisReceitas`);
    seo.setCanonical(`pesquisar/${search}`);
    seo.setDescription(
      `Curta e aproveite as mais deliciosas receitas de ${search}, isso e muito mais você encontra aqui, confira.`
    );

    return {
      root: () =>
        pug.renderFile(pugFile, {
          title: search,
          recipeWithImage,
          recipeList: recipes,
        }),
      seo,
    };
  };
}

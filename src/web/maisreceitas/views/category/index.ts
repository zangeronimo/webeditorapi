import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { CategoryService } from "@application/service/culinary/CategoryService";
import { RecipeService } from "@application/service/culinary/RecipeService";
import pug from "pug";
import { container } from "tsyringe";
import { RecipeWithImage } from "../components/recipeWithImage";
import { RecipeList } from "../components/recipeList";
import { GetAllRecipesFilterModel } from "@application/model/culinary/recipe/GetAllRecipesFilterModel";
import { SeoService } from "@application/service/SeoService";

export class Category {
  readonly recipeService = container.resolve(RecipeService);
  readonly categoryService = container.resolve(CategoryService);
  readonly company = process.env.MAISRECEITAS!;

  render = async (pugFile: string, levelSlug: string, categorySlug: string) => {
    const category = await this.categoryService.getBySlugAsync(
      levelSlug,
      categorySlug,
      this.company
    );

    const model = new GetAllWithImageFilterModel();
    model.random = true;
    model.total = 6;
    model.categoryId = category.id;
    const withImage = new RecipeWithImage();
    const recipeWithImage = await withImage.render(model, "");

    const modelList = new GetAllRecipesFilterModel();
    modelList.total = 9999;
    modelList.orderBy = "name";
    modelList.categoryId = category.id;
    const recipeList = new RecipeList();
    const recipes = await recipeList.render("", modelList);

    const seo = new SeoService();
    seo.setCategoryTitle(category.level?.name ?? "", category.name);
    seo.setCanonical(`categoria/${levelSlug}/${categorySlug}`);
    seo.setDescription(
      `Curta e aproveite as mais deliciosas receitas em ${category.level?.name} / ${category.name}, isso e muito mais você encontra aqui, confira.`
    );

    return {
      root: () =>
        pug.renderFile(pugFile, {
          title: `Receitas de ${category.level?.name} / ${category.name}`,
          recipeWithImage,
          recipeList: recipes,
        }),
      seo,
    };
  };
}

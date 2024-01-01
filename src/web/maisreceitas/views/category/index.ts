import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { CategoryService } from "@application/service/culinary/CategoryService";
import { RecipeService } from "@application/service/culinary/RecipeService";
import pug from "pug";
import { container } from "tsyringe";
import { RecipeWithImage } from "../components/recipeWithImage";

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
    model.total = 15;
    model.categoryId = category.id;
    const withImage = new RecipeWithImage();
    const recipeWithImage = await withImage.render(model);

    return () =>
      pug.renderFile(pugFile, {
        recipeWithImage,
      });
  };
}

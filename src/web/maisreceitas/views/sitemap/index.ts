import { GetAllRecipesFilterModel } from "@application/model/culinary/recipe/GetAllRecipesFilterModel";
import { RecipeService } from "@application/service/culinary/RecipeService";
import pug from "pug";
import { container } from "tsyringe";

export class Sitemap {
  readonly recipeService = container.resolve(RecipeService);
  readonly company = process.env.MAISRECEITAS!;

  getSitemap = async () => {
    const model = new GetAllRecipesFilterModel();
    model.total = 9999;
    model.orderBy = "name";
    const recipes = await this.recipeService.getRecipesAsync(
      model,
      this.company
    );
    return recipes;
  };
}

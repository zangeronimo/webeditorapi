import { GetAllRecipesFilterModel } from "@application/model/culinary/recipe/GetAllRecipesFilterModel";
import { RecipeService } from "@application/service/culinary/RecipeService";
import path from "path";
import pug from "pug";
import { container } from "tsyringe";

export class RecipeList {
  readonly recipeService = container.resolve(RecipeService);
  readonly company = process.env.MAISRECEITAS!;

  render = async (title: string, model: GetAllRecipesFilterModel) => {
    const recipes = await this.recipeService.getRecipesAsync(
      model,
      this.company
    );
    return () =>
      pug.renderFile(path.join(__dirname, "index.pug"), {
        title,
        recipes,
        apiUrl: process.env.API_URL,
      });
  };
}

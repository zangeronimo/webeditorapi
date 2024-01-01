import { RecipeService } from "@application/service/culinary/RecipeService";
import { container } from "tsyringe";
import pug from "pug";

export class Recipe {
  readonly recipeService = container.resolve(RecipeService);
  readonly company = process.env.MAISRECEITAS!;

  render = async (pugFile: string, recipeSlug: string) => {
    const recipe = await this.recipeService.getBySlugAsync(
      recipeSlug,
      this.company
    );
    return () =>
      pug.renderFile(pugFile, {
        recipe,
        apiUrl: process.env.API_URL,
      });
  };
}

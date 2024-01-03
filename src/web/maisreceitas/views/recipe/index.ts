import { RecipeService } from "@application/service/culinary/RecipeService";
import { container } from "tsyringe";
import pug from "pug";
import { SeoService } from "@application/service/SeoService";

export class Recipe {
  readonly recipeService = container.resolve(RecipeService);
  readonly company = process.env.MAISRECEITAS!;

  render = async (pugFile: string, recipeSlug: string) => {
    const recipe = await this.recipeService.getBySlugAsync(
      recipeSlug,
      this.company
    );
    const seo = new SeoService();
    seo.setRecipeTitle(recipe.name);
    seo.setCanonical(`receita/${recipeSlug}`);
    seo.setDescription(recipe.preparation);
    if (recipe.images.length > 0) seo.setImage(recipe.images[0]);
    return {
      root: () =>
        pug.renderFile(pugFile, {
          recipe,
          apiUrl: process.env.API_URL,
        }),
      seo,
    };
  };
}

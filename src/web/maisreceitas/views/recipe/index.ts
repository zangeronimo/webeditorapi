import { RecipeService } from "@application/service/culinary/RecipeService";
import { container } from "tsyringe";
import pug from "pug";
import { SeoService } from "@application/service/SeoService";
import { RatingList } from "../components/ratingList";
import { RatingForm } from "../components/ratingForm";
import { RatingCreateDataModel } from "@application/model/culinary/rating";

export class Recipe {
  readonly recipeService = container.resolve(RecipeService);
  readonly company = process.env.MAISRECEITAS!;

  render = async (
    pugFile: string,
    ratingListPugFile: string,
    ratingFormPugFile: string,
    recipeSlug: string
  ) => {
    const recipe = await this.recipeService.getBySlugAsync(
      recipeSlug,
      this.company
    );
    const ratingListComponet = new RatingList();
    const ratingList = ratingListComponet.render(
      ratingListPugFile,
      recipe.ratings
    );
    const ratingFormComponent = new RatingForm();
    const ratingForm = ratingFormComponent.render(ratingFormPugFile);
    const seo = new SeoService();
    seo.setRecipeTitle(recipe.name);
    seo.setCanonical(`receita/${recipeSlug}`);
    seo.setDescription(recipe.preparation);
    if (recipe.images.length > 0)
      seo.setImage(process.env.MAISRECEITAS_URL!, recipe.images[0]);
    return {
      root: () =>
        pug.renderFile(pugFile, {
          recipe,
          ratingList,
          ratingForm,
          rate: recipe.getRate(),
          apiUrl: process.env.MAISRECEITAS_URL,
        }),
      seo,
    };
  };

  rate = async (
    recipeSlug: string,
    rate: number,
    name: string,
    comment: string
  ) => {
    await this.recipeService.createRatingAsync(
      recipeSlug,
      rate,
      name,
      comment,
      this.company
    );
  };
}

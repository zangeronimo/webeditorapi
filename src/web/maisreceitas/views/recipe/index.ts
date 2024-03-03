import { SeoService } from "@application/service/SeoService";
import { RecipeService } from "@application/service/culinary/RecipeService";
import { BannerService } from "@application/service/publicity/BannerService";
import pug from "pug";
import { container } from "tsyringe";
import { RatingForm } from "../components/ratingForm";
import { RatingList } from "../components/ratingList";
import { BannerDto } from "@domain/dto/publicity";

export class Recipe {
  readonly recipeService = container.resolve(RecipeService);
  readonly bannerService = container.resolve(BannerService);
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
    const rate = recipe.getRate();
    const ratingFormComponent = new RatingForm();
    const ratingForm = ratingFormComponent.render(ratingFormPugFile);
    const seo = new SeoService();
    seo.setRecipeTitle(recipe.name);
    seo.setCanonical(`receita/${recipeSlug}`);
    seo.setDescription(recipe.preparation);
    seo.setRecipe(recipe);
    let banners: BannerDto[] = [];
    if (recipe.images.length > 0)
      seo.setImage(process.env.MAISRECEITAS_URL!, recipe.images[0]);
    else banners = await this.bannerService.getRandAsync(3, this.company);
    return {
      root: () =>
        pug.renderFile(pugFile, {
          recipe,
          ratingList,
          ratingForm,
          rate,
          banners,
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

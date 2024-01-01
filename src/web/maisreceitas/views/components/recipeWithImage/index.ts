import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { RecipeService } from "@application/service/culinary/RecipeService";
import path from "path";
import pug from "pug";
import { container } from "tsyringe";

export class RecipeWithImage {
  readonly recipeService = container.resolve(RecipeService);
  readonly company = process.env.MAISRECEITAS!;

  render = async (model: GetAllWithImageFilterModel) => {
    const withPicture = await this.recipeService.getWithImageAsync(
      model,
      this.company
    );
    return () =>
      pug.renderFile(path.join(__dirname, "index.pug"), {
        withPicture,
        apiUrl: process.env.API_URL,
      });
  };
}

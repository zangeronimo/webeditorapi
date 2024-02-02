import { RecipeService } from "@application/service/culinary/RecipeService";
import { container } from "tsyringe";
import { Pug } from "web/webeditor/models/Pug";
import { SEO } from "web/webeditor/models/Seo";

export class Newsletter extends Pug {
  readonly recipeService = container.resolve(RecipeService);

  render = async () => {
    const seo = new SEO("WEBEditor - Institucional - Newsletters");
    return {
      root: () => this.renderFile("newsletter", {}),
      seo,
    };
  };
}

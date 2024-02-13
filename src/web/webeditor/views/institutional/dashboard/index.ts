import { RecipeService } from "@application/service/culinary/RecipeService";
import { Pug } from "@web/webeditor/models/Pug";
import { SEO } from "@web/webeditor/models/Seo";
import { container } from "tsyringe";

export class Dashboard extends Pug {
  readonly recipeService = container.resolve(RecipeService);

  render = async () => {
    const seo = new SEO("WEBEditor");
    return {
      root: () => this.renderFile("institutional/dashboard", {}),
      seo,
    };
  };
}

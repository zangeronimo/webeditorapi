import { RecipeService } from "@application/service/culinary/RecipeService";
import { container } from "tsyringe";
import { Pug } from "web/webeditor/models/Pug";
import { SEO } from "web/webeditor/models/Seo";

export class Dashboard extends Pug {
  readonly recipeService = container.resolve(RecipeService);

  render = async () => {
    const seo = new SEO("WEBEditor");
    return {
      root: () => this.renderFile("dashboard", {}),
      seo,
    };
  };
}

import { RecipeService } from "@application/service/culinary/RecipeService";
import { Pug } from "@web/webeditor/models/Pug";
import { SEO } from "@web/webeditor/models/Seo";
import { container } from "tsyringe";

export class AccessDenied extends Pug {
  render = async () => {
    const seo = new SEO("WEBEditor - Acesso Negado");
    return {
      root: () => this.renderFile("accessDenied", {}),
      seo,
    };
  };
}

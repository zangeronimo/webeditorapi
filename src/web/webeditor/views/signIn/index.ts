import { Pug } from "web/webeditor/models/Pug";
import { SEO } from "web/webeditor/models/Seo";

export class SignIn extends Pug {
  render = async () => {
    const seo = new SEO("WEBEditor - Sign In");
    return {
      root: () => this.renderFile("signIn", {}),
      seo,
    };
  };
}

import { Pug } from "@web/webeditor/models/Pug";

export class SideBar extends Pug {
  render = async () => {
    return () => this.renderFile("components/sidebar", {});
  };
}

import { Pug } from "web/webeditor/models/Pug";

export class Pagination extends Pug {
  render = async (total: number) => {
    return () => this.renderFile("components/pagination", { total });
  };
}

import path from "path";
import pug from "pug";

export class Pug {
  #apiUrl = process.env.WEBEDITOR_URL;

  renderFile = (pathFolder: string, content: {}) =>
    pug.renderFile(
      this.pugFile(pathFolder),
      Object.assign(content, { apiUrl: this.#apiUrl })
    );

  private pugFile = (pathFolder: string) =>
    path.join(__dirname, "..", "views", pathFolder, "index.pug");
}

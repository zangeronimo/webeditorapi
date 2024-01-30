import path from "path";
import pug from "pug";

export class Pug {
  #apiUrl = process.env.WEBEDITOR_URL;

  #pugFile = (pathFolder: string) =>
    path.join(__dirname, "..", "views", pathFolder, "index.pug");

  renderFile = (pathFolder: string, content: {}) =>
    pug.renderFile(
      this.#pugFile(pathFolder),
      Object.assign(content, { apiUrl: this.#apiUrl })
    );
}

import pug from "pug";

export class RatingForm {
  render = (pugFile: string) => {
    return () =>
      pug.renderFile(pugFile, {
        apiUrl: process.env.MAISRECEITAS_URL,
      });
  };
}

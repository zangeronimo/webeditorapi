import { RatingDto } from "@domain/dto/culinary";
import pug from "pug";

export class RatingList {
  render = (pugFile: string, ratings: RatingDto[]) => {
    return () =>
      pug.renderFile(pugFile, {
        ratings,
        apiUrl: process.env.MAISRECEITAS_URL,
      });
  };
}

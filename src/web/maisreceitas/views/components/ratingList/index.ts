import { RatingDto } from "@domain/dto/culinary";
import pug from "pug";

export class RatingList {
  render = (pugFile: string, ratings: RatingDto[]) => {
    ratings = ratings.filter((rating) => rating.name || rating.comment);
    return () =>
      pug.renderFile(pugFile, {
        ratings,
        apiUrl: process.env.MAISRECEITAS_URL,
      });
  };
}

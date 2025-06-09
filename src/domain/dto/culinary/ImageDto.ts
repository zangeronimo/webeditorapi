import { Image } from "@domain/entity/culinary";
import { DtoBase } from "../DtoBase";

export class ImageDto extends DtoBase {
  url: string;
  active: number;

  constructor(image: Image) {
    super(image.id, image.createdAt, image.updatedAt);
    this.url = image?.url!;
    this.active = image?.active.valueOf();
  }
}

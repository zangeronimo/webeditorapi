import { Image } from "@domain/entity/culinary/Image";

export class RecipeUpdateDataModel {
  constructor(
    readonly id: string,
    readonly slug: string,
    readonly name: string,
    readonly ingredients: string,
    readonly preparation: string,
    readonly moreInformation: string,
    readonly active: number,
    readonly categoryId: string,
    readonly imageUpload?: string,
    readonly images?: Image[]
  ) {}
}

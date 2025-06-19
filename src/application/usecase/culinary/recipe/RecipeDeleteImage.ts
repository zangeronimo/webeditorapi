import { IStorageProvider } from "@application/interface/provider/IStorageProvider";
import { IRecipeRepository } from "@application/interface/repository/culinary";
import { IRecipeDeleteImage } from "@application/interface/usecase/culinary/recipe/IRecipeDeleteImage";
import { Messages } from "@application/messages/Messages";
import { RecipeDto } from "@domain/dto/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeDeleteImage implements IRecipeDeleteImage {
  constructor(
    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository,
    @inject("IStorageProvider")
    readonly _storageProvider: IStorageProvider
  ) {}

  async executeAsync(id: string, company: string) {
    const image = await this._recipeRepository.getImageByIdAsync(id, company)!;
    if (image === null) {
      throw new Error(Messages.notFound("Image"));
    }
    await this._storageProvider.deleteFile(image.url);
    await this._recipeRepository.deleteImageAsync(image, new Date());
  }
}

import { IStorageProvider } from "@application/interface/provider/IStorageProvider";
import { IRecipeRepository } from "@application/interface/repository/culinary";
import { IRecipeUpdate } from "@application/interface/usecase/culinary/recipe";
import { Messages } from "@application/messages/Messages";
import { RecipeUpdateDataModel } from "@application/model/culinary/recipe";
import { RecipeDto } from "@domain/dto/culinary";
import { Image } from "@domain/entity/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeUpdate implements IRecipeUpdate {
  constructor(
    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository,
    @inject("IStorageProvider")
    readonly _storageProvider: IStorageProvider
  ) {}

  async executeAsync(recipeData: RecipeUpdateDataModel, company: string) {
    const recipe = await this._recipeRepository.getByIdAsync(
      recipeData.id,
      company
    )!;
    if (recipe === null) {
      throw new Error(Messages.notFound("Recipe"));
    }
    if (recipeData.slug !== recipe.slug) {
      const existSlug = await this._recipeRepository.getBySlugAsync(
        recipeData.slug,
        company
      );
      if (existSlug !== null) {
        throw new Error(Messages.alreadyInUse("Slug"));
      }
    }
    if (recipeData.images) {
      recipeData.images.map((image: Image) => image.update(image.active));
    }
    if (recipeData.imageUpload) {
      const filePath = await this._storageProvider.saveFile(
        recipeData.imageUpload,
        company,
        "recipes"
      );
      const image = Image.create(filePath, recipeData.id, company, "");
      recipeData.images?.push(image);
    }
    recipe.update(recipeData);
    await this._recipeRepository.updateAsync(recipe);
    return new RecipeDto(recipe);
  }
}

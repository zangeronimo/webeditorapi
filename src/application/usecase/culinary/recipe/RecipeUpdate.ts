import { IStorageProvider } from "@application/interface/provider/IStorageProvider";
import { IRecipeRepository } from "@application/interface/repository/culinary";
import { IRecipeRecipesRepository } from "@application/interface/repository/culinary/IRecipeRecipesRepository";
import { IRecipeUpdate } from "@application/interface/usecase/culinary/recipe";
import { Messages } from "@application/messages/Messages";
import { RecipeUpdateDataModel } from "@application/model/culinary/recipe";
import { RecipeRecipesUpdateDataModel } from "@application/model/culinary/recipe/RecipeRecipesUpdateModel";
import { RecipeDto } from "@domain/dto/culinary";
import { RecipeRecipesDto } from "@domain/dto/culinary/RecipeRecipesDto";
import { Image } from "@domain/entity/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeUpdate implements IRecipeUpdate {
  constructor(
    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository,
    @inject("IRecipeRecipesRepository")
    readonly _recipeNewRepository: IRecipeRecipesRepository,
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

  async executeNewAsync(
    recipeData: RecipeRecipesUpdateDataModel,
    company: string
  ) {
    const recipe = await this._recipeNewRepository.getByIdAsync(
      recipeData.id,
      company
    )!;
    if (recipe === null) {
      throw new Error(Messages.notFound("Recipe"));
    }
    if (recipeData.slug !== recipe.slug) {
      const existSlug = await this._recipeNewRepository.getBySlugAsync(
        recipeData.slug,
        company
      );
      if (existSlug !== null) {
        throw new Error(Messages.alreadyInUse("Slug"));
      }
    }
    recipe.update(recipeData);
    if (recipeData.imageUpload) {
      if (recipe.imageUrl) {
        await this._storageProvider.deleteFile(recipe.imageUrl);
      }
      const filePath = await this._storageProvider.saveFile(
        recipeData.imageUpload,
        company,
        "recipes"
      );
      recipe.setImage(filePath);
    }
    await this._recipeNewRepository.updateAsync(recipe);
    return new RecipeRecipesDto(recipe);
  }
}

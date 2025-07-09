import { IRecipeRepository } from "@application/interface/repository/culinary";
import { IRecipeRecipesRepository } from "@application/interface/repository/culinary/IRecipeRecipesRepository";
import { IRecipeGetById } from "@application/interface/usecase/culinary/recipe";
import { Messages } from "@application/messages/Messages";
import { ImageDto, RecipeDto } from "@domain/dto/culinary";
import { RecipeRecipesDto } from "@domain/dto/culinary/RecipeRecipesDto";
import { Image } from "@domain/entity/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeGetById implements IRecipeGetById {
  constructor(
    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository,
    @inject("IRecipeRecipesRepository")
    readonly _recipeNewRepository: IRecipeRecipesRepository
  ) {}

  async executeAsync(id: string, company: string) {
    const recipe = await this._recipeRepository.getByIdAsync(id, company)!;
    if (recipe === null) {
      throw new Error(Messages.notFound("Recipe"));
    }
    const images = recipe.images.map((image: Image) => new ImageDto(image));
    return new RecipeDto(recipe, images);
  }

  async executeNewAsync(id: string, company: string) {
    const recipe = await this._recipeNewRepository.getByIdAsync(id, company)!;
    if (recipe === null) {
      throw new Error(Messages.notFound("Recipe"));
    }
    const images = recipe.images.map((image: Image) => new ImageDto(image));
    return new RecipeRecipesDto(recipe, images);
  }
}

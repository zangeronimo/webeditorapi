import { IRecipeRepository } from "@application/interface/repository/culinary";
import { IRecipeRecipesRepository } from "@application/interface/repository/culinary/IRecipeRecipesRepository";
import { IRecipeGetAll } from "@application/interface/usecase/culinary/recipe";
import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { ImageDto, RecipeDto } from "@domain/dto/culinary";
import { RecipeRecipesDto } from "@domain/dto/culinary/RecipeRecipesDto";
import { Image, Recipe } from "@domain/entity/culinary";
import { RecipeRecipes } from "@domain/entity/culinary/RecipeRecipes";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeGetAll implements IRecipeGetAll {
  constructor(
    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository,
    @inject("IRecipeRecipesRepository")
    readonly _recipeNewRepository: IRecipeRecipesRepository
  ) {}

  async executeAsync(model: GetAllRecipeFilterModel, company: string) {
    const { itens: recipes, total } = await this._recipeRepository.getAllAsync(
      model,
      company
    )!;
    const recipesDto = recipes.map((recipe: Recipe) => {
      const images = recipe.images.map((image: Image) => new ImageDto(image));
      return new RecipeDto(recipe, images);
    });
    return new PaginatorResultDto(recipesDto, total);
  }

  async executeNewAsync(model: GetAllRecipeFilterModel, company: string) {
    const { itens: recipes, total } =
      await this._recipeNewRepository.getAllAsync(model, company)!;
    const recipesDto = recipes.map((recipe: RecipeRecipes) => {
      const images = recipe.images.map((image: Image) => new ImageDto(image));
      return new RecipeRecipesDto(recipe, images);
    });
    return new PaginatorResultDto(recipesDto, total);
  }
}

import { IRecipeRepository } from "@application/interface/repository/culinary";
import { IRecipeGetAll } from "@application/interface/usecase/culinary/recipe";
import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { RecipeDto } from "@domain/dto/culinary";
import { Recipe } from "@domain/entity/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeGetAll implements IRecipeGetAll {
  constructor(
    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository,
  ) {}

  async executeAsync(model: GetAllRecipeFilterModel, company: string) {
    const { itens: recipes, total } = await this._recipeRepository.getAllAsync(
      model,
      company
    )!;
    const recipesDto = recipes.map((recipe: Recipe) => new RecipeDto(recipe));
    return new PaginatorResultDto(recipesDto, total);
  }
}

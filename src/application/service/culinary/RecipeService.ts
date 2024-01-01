import { IRecipeRepository } from "@application/interface/repository/culinary";
import { IRecipeService } from "@application/interface/service/culinary/IRecipeService";
import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { RecipeDto } from "@domain/dto/culinary";
import { Recipe } from "@domain/entity/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeService implements IRecipeService {
  constructor(
    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository
  ) {}

  async getNewsAsync(total: number, company: string): Promise<RecipeDto[]> {
    const recipes = await this._recipeRepository.getNewsAsync(total, company);
    return recipes.map((recipe: Recipe) => {
      return new RecipeDto(recipe);
    });
  }

  async getWithImageAsync(
    model: GetAllWithImageFilterModel,
    company: string
  ): Promise<RecipeDto[]> {
    const recipes = await this._recipeRepository.getWithImageAsync(
      model,
      company
    );
    const recipesDto = [];
    for (let i = 0; i < recipes.length; i++) {
      const images = await this._recipeRepository.getAllImagesByRecipeId(
        recipes[i].id,
        recipes[i].companyId
      );
      const recipeDto = new RecipeDto(recipes[i], images);
      recipesDto.push(recipeDto);
    }
    return recipesDto;
  }

  async getBySlugAsync(slug: string, company: string): Promise<RecipeDto> {
    const recipe = await this._recipeRepository.getBySlugAsync(slug, company);
    if (!recipe) {
      throw new Error("Recipe not found.");
    }
    const images = await this._recipeRepository.getAllImagesByRecipeId(
      recipe.id,
      recipe.companyId
    );
    return new RecipeDto(recipe, images);
  }
}

import { IRecipeRepository } from "@application/interface/repository/culinary";
import { IRecipeService } from "@application/interface/service/culinary/IRecipeService";
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
    total: number,
    company: string
  ): Promise<RecipeDto[]> {
    const recipes = await this._recipeRepository.getWithImageAsync(
      total,
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

  async getByIdAsync(id: string, company: string): Promise<RecipeDto> {
    throw new Error("Method not implemented.");
  }
}

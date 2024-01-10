import { IRecipeRepository } from "@application/interface/repository/culinary";
import { ICategoryService } from "@application/interface/service/culinary/ICategoryService";
import { IRatingService } from "@application/interface/service/culinary/IRatingService";
import { IRecipeService } from "@application/interface/service/culinary/IRecipeService";
import { RatingCreateDataModel } from "@application/model/culinary/rating";
import { GetAllRecipesFilterModel } from "@application/model/culinary/recipe/GetAllRecipesFilterModel";
import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { RecipeDto } from "@domain/dto/culinary";
import { ActiveEnum } from "@domain/enum";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeService implements IRecipeService {
  constructor(
    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository,
    @inject("ICategoryService")
    readonly _categoryService: ICategoryService,
    @inject("IRatingService")
    readonly _ratingService: IRatingService
  ) {}

  async getRecipesAsync(
    model: GetAllRecipesFilterModel,
    company: string
  ): Promise<RecipeDto[]> {
    const recipes = await this._recipeRepository.getRecipesAsync(
      model,
      company
    );
    const recipesDto = [];
    for (let i = 0; i < recipes.length; i++) {
      const ratings = await this._ratingService.getAllByRecipeAsync(
        recipes[i].id,
        recipes[i].companyId
      );
      const recipeDto = new RecipeDto(recipes[i], [], ratings);
      recipesDto.push(recipeDto);
    }
    return recipesDto;
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
      const ratings = await this._ratingService.getAllByRecipeAsync(
        recipes[i].id,
        recipes[i].companyId
      );
      const recipeDto = new RecipeDto(recipes[i], images, ratings);
      recipesDto.push(recipeDto);
    }
    return recipesDto;
  }

  async getBySlugAsync(slug: string, company: string): Promise<RecipeDto> {
    const recipe = await this._recipeRepository.getBySlugAsync(slug, company);
    if (!recipe) {
      throw new Error("Recipe not found.");
    }
    const category = await this._categoryService.getByIdAsync(
      recipe.categoryId,
      recipe.companyId
    );
    const images = await this._recipeRepository.getAllImagesByRecipeId(
      recipe.id,
      recipe.companyId
    );
    const ratings = await this._ratingService.getAllByRecipeAsync(
      recipe.id,
      recipe.companyId
    );
    return new RecipeDto(recipe, images, ratings, category);
  }

  async createRatingAsync(
    slug: string,
    rate: number,
    name: string,
    comment: string,
    company: string
  ): Promise<void> {
    const recipe = await this._recipeRepository.getBySlugAsync(slug, company);
    if (!recipe) {
      throw new Error("Recipe not found.");
    }
    const active = !name && !comment ? ActiveEnum.ACTIVE : ActiveEnum.INACTIVE;
    const model = new RatingCreateDataModel(
      rate,
      comment,
      active,
      recipe.id,
      name
    );
    await this._ratingService.createAsync(model, company);
  }
}

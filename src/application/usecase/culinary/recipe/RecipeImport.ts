import {
  ICategoryRepository,
  IRatingRepository,
  IRecipeRepository,
} from "@application/interface/repository/culinary";
import { IRecipeRecipesRepository } from "@application/interface/repository/culinary/IRecipeRecipesRepository";
import { IRecipesRatingRepository } from "@application/interface/repository/culinary/IRecipesRatingRepository";
import { IRecipeImport } from "@application/interface/usecase/culinary/recipe/IRecipeImport";
import { Messages } from "@application/messages/Messages";
import { RatingCreateDataModel } from "@application/model/culinary/rating";
import { RecipeRecipesCreateDataModel } from "@application/model/culinary/recipe/RecipeRecipesCreateModel";
import { Rating } from "@domain/entity/culinary";
import { RecipeRecipes } from "@domain/entity/culinary/RecipeRecipes";
import { ActiveEnum } from "@domain/enum";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeImport implements IRecipeImport {
  constructor(
    @inject("IRecipeRepository")
    readonly _recipeRepository: IRecipeRepository,
    @inject("IRecipeRecipesRepository")
    readonly _recipeNewRepository: IRecipeRecipesRepository,
    @inject("IRatingRepository")
    readonly _ratingRepository: IRatingRepository,
    @inject("IRecipesRatingRepository")
    readonly _recipesRatingRepository: IRecipesRatingRepository,
    @inject("ICategoryRepository")
    readonly _categoryRepository: ICategoryRepository
  ) {}

  async executeAsync(id: string, company: string) {
    const recipe = await this._recipeRepository.getByIdAsync(id, company)!;
    if (recipe === null) {
      throw new Error(Messages.notFound("Recipe"));
    }
    const category = await this._categoryRepository.getByIdAsync(
      recipe.categoryId,
      company
    );
    const model = new RecipeRecipesCreateDataModel(
      recipe.name,
      recipe.name,
      recipe.name,
      recipe.ingredients,
      recipe.preparation,
      "",
      0,
      0,
      0,
      "",
      "",
      recipe.moreInformation,
      recipe.name,
      recipe.name,
      recipe.name.split(" "),
      [],
      ActiveEnum.INACTIVE,
      category?.levelId!
    );
    const newRecipe = RecipeRecipes.create(model, company);
    const { id: recipeNewId } = await this._recipeNewRepository.saveAsync(
      newRecipe
    );

    const ratings = await this._ratingRepository.getAllByRecipeAsync(
      recipe.id,
      company
    );
    if (ratings.length) {
      for (let i = 0; i < ratings.length; i++) {
        const rateModel = new RatingCreateDataModel(
          ratings[i].rate,
          ratings[i].comment,
          ratings[i].active,
          recipeNewId,
          ratings[i].name
        );
        const rate = Rating.create(rateModel, company);
        await this._recipesRatingRepository.saveAsync(rate);
      }
    }
  }
}

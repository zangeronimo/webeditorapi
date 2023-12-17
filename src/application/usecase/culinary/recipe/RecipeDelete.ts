import { IRecipeRepository } from "@application/interface/repository/culinary";
import { IRecipeDelete } from "@application/interface/usecase/culinary/recipe";
import { Messages } from "@application/messages/Messages";
import { RecipeDto } from "@domain/dto/culinary";
import { inject } from "@infra/di/Inject";

export class RecipeDelete implements IRecipeDelete {
  @inject("IRecipeRepository")
  _recipeRepository?: IRecipeRepository;

  async executeAsync(id: string, company: string) {
    const recipe = await this._recipeRepository?.getByIdAsync(id, company)!;
    if (recipe === null) {
      throw new Error(Messages.notFound("Recipe"));
    }
    await this._recipeRepository?.deleteAsync(recipe, new Date());
    return new RecipeDto(recipe);
  }
}

import { IRecipeRepository } from "@application/interface/repository/culinary";
import { IRecipeGetById } from "@application/interface/usecase/culinary/recipe";
import { Messages } from "@application/messages/Messages";
import { RecipeDto } from "@domain/dto/culinary";
import { inject } from "@infra/di/Inject";

export class RecipeGetById implements IRecipeGetById {
  @inject("IRecipeRepository")
  _recipeRepository?: IRecipeRepository;

  async executeAsync(id: string, company: string) {
    const recipe = await this._recipeRepository?.getByIdAsync(id, company)!;
    if (recipe === null) {
      throw new Error(Messages.notFound("Recipe"));
    }
    return new RecipeDto(recipe);
  }
}

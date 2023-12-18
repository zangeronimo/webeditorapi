import {
  CategoryGetAll,
  CategoryGetById,
  CategoryCreate,
  CategoryUpdate,
  CategoryDelete,
} from "@application/usecase/culinary/category";
import {
  LevelCreate,
  LevelDelete,
  LevelGetAll,
  LevelGetById,
  LevelUpdate,
} from "@application/usecase/culinary/level";
import {
  RatingGetAll,
  RatingGetById,
  RatingCreate,
  RatingUpdate,
  RatingDelete,
} from "@application/usecase/culinary/rating";
import {
  RecipeGetAll,
  RecipeGetById,
  RecipeCreate,
  RecipeUpdate,
  RecipeDelete,
} from "@application/usecase/culinary/recipe";
import { DbContext } from "@infra/context";
import { Registry } from "@infra/di/Registry";
import {
  CategoryRepository,
  LevelRepository,
  RatingRepository,
  RecipeRepository,
} from "@infra/repository/culinary";

export class CulinaryExtension {
  static init(dbContext: DbContext) {
    // Registry Repositories
    Registry.getInstance().provide(
      "ILevelRepository",
      new LevelRepository(dbContext)
    );
    Registry.getInstance().provide(
      "ICategoryRepository",
      new CategoryRepository(dbContext)
    );
    Registry.getInstance().provide(
      "IRecipeRepository",
      new RecipeRepository(dbContext)
    );
    Registry.getInstance().provide(
      "IRatingRepository",
      new RatingRepository(dbContext)
    );

    // Registry Level useCases
    Registry.getInstance().provide("ILevelGetAll", new LevelGetAll());
    Registry.getInstance().provide("ILevelGetById", new LevelGetById());
    Registry.getInstance().provide("ILevelCreate", new LevelCreate());
    Registry.getInstance().provide("ILevelUpdate", new LevelUpdate());
    Registry.getInstance().provide("ILevelDelete", new LevelDelete());

    // Registry Category useCases
    Registry.getInstance().provide("ICategoryGetAll", new CategoryGetAll());
    Registry.getInstance().provide("ICategoryGetById", new CategoryGetById());
    Registry.getInstance().provide("ICategoryCreate", new CategoryCreate());
    Registry.getInstance().provide("ICategoryUpdate", new CategoryUpdate());
    Registry.getInstance().provide("ICategoryDelete", new CategoryDelete());

    // Registry Recipe useCases
    Registry.getInstance().provide("IRecipeGetAll", new RecipeGetAll());
    Registry.getInstance().provide("IRecipeGetById", new RecipeGetById());
    Registry.getInstance().provide("IRecipeCreate", new RecipeCreate());
    Registry.getInstance().provide("IRecipeUpdate", new RecipeUpdate());
    Registry.getInstance().provide("IRecipeDelete", new RecipeDelete());

    // Registry Rating useCases
    Registry.getInstance().provide("IRatingGetAll", new RatingGetAll());
    Registry.getInstance().provide("IRatingGetById", new RatingGetById());
    Registry.getInstance().provide("IRatingCreate", new RatingCreate());
    Registry.getInstance().provide("IRatingUpdate", new RatingUpdate());
    Registry.getInstance().provide("IRatingDelete", new RatingDelete());
  }
}

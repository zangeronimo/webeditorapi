import {
  ICategoryRepository,
  ILevelRepository,
  IRatingRepository,
  IRecipeRepository,
} from "@application/interface/repository/culinary";
import { IRecipeService } from "@application/interface/service/culinary/IRecipeService";
import {
  ICategoryCreate,
  ICategoryDelete,
  ICategoryGetAll,
  ICategoryGetById,
  ICategoryUpdate,
} from "@application/interface/usecase/culinary/category";
import {
  ILevelCreate,
  ILevelDelete,
  ILevelGetAll,
  ILevelGetById,
  ILevelUpdate,
} from "@application/interface/usecase/culinary/level";
import {
  IRatingCreate,
  IRatingDelete,
  IRatingGetAll,
  IRatingGetById,
  IRatingUpdate,
} from "@application/interface/usecase/culinary/rating";
import {
  IRecipeCreate,
  IRecipeDelete,
  IRecipeGetAll,
  IRecipeGetById,
  IRecipeUpdate,
} from "@application/interface/usecase/culinary/recipe";
import { RecipeService } from "@application/service/culinary/RecipeService";
import {
  CategoryCreate,
  CategoryDelete,
  CategoryGetAll,
  CategoryGetById,
  CategoryUpdate,
} from "@application/usecase/culinary/category";
import {
  LevelCreate,
  LevelDelete,
  LevelGetAll,
  LevelGetById,
  LevelUpdate,
} from "@application/usecase/culinary/level";
import {
  RatingCreate,
  RatingDelete,
  RatingGetAll,
  RatingGetById,
  RatingUpdate,
} from "@application/usecase/culinary/rating";
import {
  RecipeCreate,
  RecipeDelete,
  RecipeGetAll,
  RecipeGetById,
  RecipeUpdate,
} from "@application/usecase/culinary/recipe";
import {
  CategoryRepository,
  LevelRepository,
  RatingRepository,
  RecipeRepository,
} from "@infra/repository/culinary";
import { container } from "tsyringe";

export class CulinaryExtension {
  static init() {
    // Registry Repositories
    container.registerSingleton<ILevelRepository>(
      "ILevelRepository",
      LevelRepository
    );
    container.registerSingleton<ICategoryRepository>(
      "ICategoryRepository",
      CategoryRepository
    );
    container.registerSingleton<IRecipeRepository>(
      "IRecipeRepository",
      RecipeRepository
    );
    container.registerSingleton<IRatingRepository>(
      "IRatingRepository",
      RatingRepository
    );

    // Registry Services
    container.registerSingleton<IRecipeService>(
      "IRecipeService",
      RecipeService
    );

    // Registry Level useCases
    container.registerSingleton<ILevelGetAll>("ILevelGetAll", LevelGetAll);
    container.registerSingleton<ILevelGetById>("ILevelGetById", LevelGetById);
    container.registerSingleton<ILevelCreate>("ILevelCreate", LevelCreate);
    container.registerSingleton<ILevelUpdate>("ILevelUpdate", LevelUpdate);
    container.registerSingleton<ILevelDelete>("ILevelDelete", LevelDelete);

    // Registry Category useCases
    container.registerSingleton<ICategoryGetAll>(
      "ICategoryGetAll",
      CategoryGetAll
    );
    container.registerSingleton<ICategoryGetById>(
      "ICategoryGetById",
      CategoryGetById
    );
    container.registerSingleton<ICategoryCreate>(
      "ICategoryCreate",
      CategoryCreate
    );
    container.registerSingleton<ICategoryUpdate>(
      "ICategoryUpdate",
      CategoryUpdate
    );
    container.registerSingleton<ICategoryDelete>(
      "ICategoryDelete",
      CategoryDelete
    );

    // Registry Recipe useCases
    container.registerSingleton<IRecipeGetAll>("IRecipeGetAll", RecipeGetAll);
    container.registerSingleton<IRecipeGetById>(
      "IRecipeGetById",
      RecipeGetById
    );
    container.registerSingleton<IRecipeCreate>("IRecipeCreate", RecipeCreate);
    container.registerSingleton<IRecipeUpdate>("IRecipeUpdate", RecipeUpdate);
    container.registerSingleton<IRecipeDelete>("IRecipeDelete", RecipeDelete);

    // Registry Rating useCases
    container.registerSingleton<IRatingGetAll>("IRatingGetAll", RatingGetAll);
    container.registerSingleton<IRatingGetById>(
      "IRatingGetById",
      RatingGetById
    );
    container.registerSingleton<IRatingCreate>("IRatingCreate", RatingCreate);
    container.registerSingleton<IRatingUpdate>("IRatingUpdate", RatingUpdate);
    container.registerSingleton<IRatingDelete>("IRatingDelete", RatingDelete);
  }
}

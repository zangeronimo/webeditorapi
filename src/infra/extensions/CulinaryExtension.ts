import {
  LevelCreate,
  LevelDelete,
  LevelGetAll,
  LevelGetById,
  LevelUpdate,
} from "@application/usecase/culinary/level";
import { DbContext } from "@infra/context";
import { Registry } from "@infra/di/Registry";
import { LevelRepository } from "@infra/repository/culinary";

export class CulinaryExtension {
  static init(dbContext: DbContext) {
    // Registry Repositories
    Registry.getInstance().provide(
      "ILevelRepository",
      new LevelRepository(dbContext)
    );

    // Registry Level useCases
    Registry.getInstance().provide("ILevelGetAll", new LevelGetAll());
    Registry.getInstance().provide("ILevelGetById", new LevelGetById());
    Registry.getInstance().provide("ILevelCreate", new LevelCreate());
    Registry.getInstance().provide("ILevelUpdate", new LevelUpdate());
    Registry.getInstance().provide("ILevelDelete", new LevelDelete());
  }
}

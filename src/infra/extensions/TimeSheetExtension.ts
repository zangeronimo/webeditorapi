import {
  ClientGetAll,
  ClientGetById,
  ClientCreate,
  ClientUpdate,
  ClientDelete,
} from "@application/usecase/timesheet/client";
import { Registry } from "../di/Registry";
import {
  ClientRepository,
  ProjectRepository,
} from "@infra/repository/timesheet";
import { DbContext } from "@infra/context";
import {
  ProjectGetAll,
  ProjectGetById,
  ProjectCreate,
  ProjectUpdate,
  ProjectDelete,
} from "@application/usecase/timesheet/project";

export class TimeSheetExtension {
  static init(dbContext: DbContext) {
    // Registry Repositories
    Registry.getInstance().provide(
      "IClientRepository",
      new ClientRepository(dbContext)
    );
    Registry.getInstance().provide(
      "IProjectRepository",
      new ProjectRepository(dbContext)
    );

    // Registry Client useCases
    Registry.getInstance().provide("IClientGetAll", new ClientGetAll());
    Registry.getInstance().provide("IClientGetById", new ClientGetById());
    Registry.getInstance().provide("IClientCreate", new ClientCreate());
    Registry.getInstance().provide("IClientUpdate", new ClientUpdate());
    Registry.getInstance().provide("IClientDelete", new ClientDelete());

    // Registry Project useCases
    Registry.getInstance().provide("IProjectGetAll", new ProjectGetAll());
    Registry.getInstance().provide("IProjectGetById", new ProjectGetById());
    Registry.getInstance().provide("IProjectCreate", new ProjectCreate());
    Registry.getInstance().provide("IProjectUpdate", new ProjectUpdate());
    Registry.getInstance().provide("IProjectDelete", new ProjectDelete());
  }
}

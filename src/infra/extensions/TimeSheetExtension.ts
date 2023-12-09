import {
  ClientCreate,
  ClientDelete,
  ClientGetAll,
  ClientGetById,
  ClientUpdate,
} from "@application/usecase/timesheet/client";
import {
  EpicCreate,
  EpicDelete,
  EpicGetAll,
  EpicGetById,
  EpicUpdate,
} from "@application/usecase/timesheet/epic";
import {
  ProjectCreate,
  ProjectDelete,
  ProjectGetAll,
  ProjectGetById,
  ProjectUpdate,
} from "@application/usecase/timesheet/project";
import { DbContext } from "@infra/context";
import {
  ClientRepository,
  ProjectRepository,
} from "@infra/repository/timesheet";
import { EpicRepository } from "@infra/repository/timesheet/EpicRepository";
import { Registry } from "../di/Registry";

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
    Registry.getInstance().provide(
      "IEpicRepository",
      new EpicRepository(dbContext)
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

    // Registry Epic useCases
    Registry.getInstance().provide("IEpicGetAll", new EpicGetAll());
    Registry.getInstance().provide("IEpicGetById", new EpicGetById());
    Registry.getInstance().provide("IEpicCreate", new EpicCreate());
    Registry.getInstance().provide("IEpicUpdate", new EpicUpdate());
    Registry.getInstance().provide("IEpicDelete", new EpicDelete());
  }
}

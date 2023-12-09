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
  PbiCreate,
  PbiDelete,
  PbiGetAll,
  PbiGetById,
  PbiUpdate,
} from "@application/usecase/timesheet/pbi";
import {
  ProjectCreate,
  ProjectDelete,
  ProjectGetAll,
  ProjectGetById,
  ProjectUpdate,
} from "@application/usecase/timesheet/project";
import {
  TaskCreate,
  TaskDelete,
  TaskGetAll,
  TaskGetById,
  TaskUpdate,
} from "@application/usecase/timesheet/task";
import { DbContext } from "@infra/context";
import {
  ClientRepository,
  EpicRepository,
  PbiRepository,
  ProjectRepository,
  TaskRepository,
} from "@infra/repository/timesheet";
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
    Registry.getInstance().provide(
      "IPbiRepository",
      new PbiRepository(dbContext)
    );
    Registry.getInstance().provide(
      "ITaskRepository",
      new TaskRepository(dbContext)
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

    // Registry Pbi useCases
    Registry.getInstance().provide("IPbiGetAll", new PbiGetAll());
    Registry.getInstance().provide("IPbiGetById", new PbiGetById());
    Registry.getInstance().provide("IPbiCreate", new PbiCreate());
    Registry.getInstance().provide("IPbiUpdate", new PbiUpdate());
    Registry.getInstance().provide("IPbiDelete", new PbiDelete());

    // Registry Task useCases
    Registry.getInstance().provide("ITaskGetAll", new TaskGetAll());
    Registry.getInstance().provide("ITaskGetById", new TaskGetById());
    Registry.getInstance().provide("ITaskCreate", new TaskCreate());
    Registry.getInstance().provide("ITaskUpdate", new TaskUpdate());
    Registry.getInstance().provide("ITaskDelete", new TaskDelete());
  }
}

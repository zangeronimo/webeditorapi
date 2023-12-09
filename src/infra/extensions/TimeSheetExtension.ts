import {
  ClientGetAll,
  ClientGetById,
  ClientCreate,
  ClientUpdate,
  ClientDelete,
} from "@application/usecase/timesheet/client";
import { Registry } from "../di/Registry";
import { ClientRepository } from "@infra/repository/timesheet";
import { DbContext } from "@infra/context";

export class TimeSheetExtension {
  static init(dbContext: DbContext) {
    // Registry Repositories
    Registry.getInstance().provide(
      "IClientRepository",
      new ClientRepository(dbContext)
    );

    // Registry Client useCases
    Registry.getInstance().provide("IClientGetAll", new ClientGetAll());
    Registry.getInstance().provide("IClientGetById", new ClientGetById());
    Registry.getInstance().provide("IClientCreate", new ClientCreate());
    Registry.getInstance().provide("IClientUpdate", new ClientUpdate());
    Registry.getInstance().provide("IClientDelete", new ClientDelete());
  }
}

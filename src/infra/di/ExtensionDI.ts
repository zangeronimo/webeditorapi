import {
  HasRole,
  MakeLogin,
  RefreshToken,
} from "@application/usecase/webeditor";
import {
  CompanyCreate,
  CompanyDelete,
  CompanyGetAll,
  CompanyGetById,
  CompanyUpdate,
} from "@application/usecase/webeditor/company";
import {
  ModuleCreate,
  ModuleDelete,
  ModuleGetAll,
  ModuleGetAllByCompany,
  ModuleGetById,
  ModuleUpdate,
} from "@application/usecase/webeditor/module";
import {
  RoleCreate,
  RoleDelete,
  RoleGetAll,
  RoleGetById,
  RoleUpdate,
} from "@application/usecase/webeditor/role";
import {
  UserCreate,
  UserDelete,
  UserGetAll,
  UserGetById,
  UserUpdate,
} from "@application/usecase/webeditor/user";
import { PgPromiseContext } from "@infra/context";
import { BCryptHashProvider, JwtWebTokenProvider } from "@infra/provider";
import {
  CompanyRepository,
  ModuleRepository,
  RoleRepository,
  UserRepository,
} from "@infra/repository/webeditor";
import { Registry } from "./Registry";
import {
  ClientCreate,
  ClientDelete,
  ClientGetAll,
  ClientGetById,
  ClientUpdate,
} from "@application/usecase/timesheet/client";
import { ClientRepository } from "@infra/repository/timesheet";

export class ExtensionDI {
  static init = (dbContext: PgPromiseContext) => {
    // Registry Repositories
    Registry.getInstance().provide(
      "IUserRepository",
      new UserRepository(dbContext)
    );
    Registry.getInstance().provide(
      "IRoleRepository",
      new RoleRepository(dbContext)
    );
    Registry.getInstance().provide(
      "ICompanyRepository",
      new CompanyRepository(dbContext)
    );
    Registry.getInstance().provide(
      "IModuleRepository",
      new ModuleRepository(dbContext)
    );

    Registry.getInstance().provide(
      "IClientRepository",
      new ClientRepository(dbContext)
    );
    // Registry Providers
    Registry.getInstance().provide("IMakeLogin", new MakeLogin());
    Registry.getInstance().provide("IRefreshToken", new RefreshToken());
    Registry.getInstance().provide("IHasRole", new HasRole());
    Registry.getInstance().provide("IHashProvider", new BCryptHashProvider());
    Registry.getInstance().provide("ITokenProvider", new JwtWebTokenProvider());
    // Registry Company UseCases
    Registry.getInstance().provide("ICompanyGetAll", new CompanyGetAll());
    Registry.getInstance().provide("ICompanyGetById", new CompanyGetById());
    Registry.getInstance().provide("ICompanyCreate", new CompanyCreate());
    Registry.getInstance().provide("ICompanyUpdate", new CompanyUpdate());
    Registry.getInstance().provide("ICompanyDelete", new CompanyDelete());
    // Registry Module useCases
    Registry.getInstance().provide(
      "IModuleGetAllByCompany",
      new ModuleGetAllByCompany()
    );
    Registry.getInstance().provide("IModuleGetAll", new ModuleGetAll());
    Registry.getInstance().provide("IModuleGetById", new ModuleGetById());
    Registry.getInstance().provide("IModuleCreate", new ModuleCreate());
    Registry.getInstance().provide("IModuleUpdate", new ModuleUpdate());
    Registry.getInstance().provide("IModuleDelete", new ModuleDelete());
    // Registry Role useCases
    Registry.getInstance().provide("IRoleGetAll", new RoleGetAll());
    Registry.getInstance().provide("IRoleGetById", new RoleGetById());
    Registry.getInstance().provide("IRoleCreate", new RoleCreate());
    Registry.getInstance().provide("IRoleUpdate", new RoleUpdate());
    Registry.getInstance().provide("IRoleDelete", new RoleDelete());
    // Registry User useCases
    Registry.getInstance().provide("IUserGetAll", new UserGetAll());
    Registry.getInstance().provide("IUserGetById", new UserGetById());
    Registry.getInstance().provide("IUserCreate", new UserCreate());
    Registry.getInstance().provide("IUserUpdate", new UserUpdate());
    Registry.getInstance().provide("IUserDelete", new UserDelete());

    // Registry Client useCases
    Registry.getInstance().provide("IClientGetAll", new ClientGetAll());
    Registry.getInstance().provide("IClientGetById", new ClientGetById());
    Registry.getInstance().provide("IClientCreate", new ClientCreate());
    Registry.getInstance().provide("IClientUpdate", new ClientUpdate());
    Registry.getInstance().provide("IClientDelete", new ClientDelete());
  };
}

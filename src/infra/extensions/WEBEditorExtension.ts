import {
  CompanyGetAll,
  CompanyGetById,
  CompanyCreate,
  CompanyUpdate,
  CompanyDelete,
} from "@application/usecase/webeditor/company";
import {
  ModuleGetAllByCompany,
  ModuleGetAll,
  ModuleGetById,
  ModuleCreate,
  ModuleUpdate,
  ModuleDelete,
} from "@application/usecase/webeditor/module";
import {
  RoleGetAll,
  RoleGetById,
  RoleCreate,
  RoleUpdate,
  RoleDelete,
} from "@application/usecase/webeditor/role";
import {
  UserGetAll,
  UserGetById,
  UserCreate,
  UserUpdate,
  UserDelete,
} from "@application/usecase/webeditor/user";
import { Registry } from "../di/Registry";
import { DbContext } from "@infra/context";
import {
  UserRepository,
  RoleRepository,
  CompanyRepository,
  ModuleRepository,
} from "@infra/repository/webeditor";

export class WEBEditorExtension {
  static init(dbContext: DbContext) {
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

    // Registry Company useCases
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
  }
}

import { ICompanyRepository, IModuleRepository, IRoleRepository, IUserRepository } from "@application/interface/repository/webeditor";
import { ICompanyCreate, ICompanyDelete, ICompanyGetAll, ICompanyGetById, ICompanyUpdate } from "@application/interface/usecase/webeditor/company";
import { IModuleCreate, IModuleDelete, IModuleGetAll, IModuleGetAllByCompany, IModuleGetById, IModuleUpdate } from "@application/interface/usecase/webeditor/module";
import { IRoleCreate, IRoleDelete, IRoleGetAll, IRoleGetById, IRoleUpdate } from "@application/interface/usecase/webeditor/role";
import { IUserCreate, IUserDelete, IUserGetAll, IUserGetById, IUserUpdate } from "@application/interface/usecase/webeditor/user";
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
import {
  CompanyRepository,
  ModuleRepository,
  RoleRepository,
  UserRepository,
} from "@infra/repository/webeditor";
import { container } from "tsyringe";

export class WEBEditorExtension {
  static init() {
    // Registry Repositories
    container.registerSingleton<IUserRepository>(
      "IUserRepository",
      UserRepository
    );
    container.registerSingleton<IRoleRepository>(
      "IRoleRepository",
      RoleRepository
    );
    container.registerSingleton<ICompanyRepository>(
      "ICompanyRepository",
      CompanyRepository
    );
    container.registerSingleton<IModuleRepository>(
      "IModuleRepository",
      ModuleRepository
    );

    // Registry Company useCases
    container.registerSingleton<ICompanyGetAll>("ICompanyGetAll", CompanyGetAll);
    container.registerSingleton<ICompanyGetById>("ICompanyGetById", CompanyGetById);
    container.registerSingleton<ICompanyCreate>("ICompanyCreate", CompanyCreate);
    container.registerSingleton<ICompanyUpdate>("ICompanyUpdate", CompanyUpdate);
    container.registerSingleton<ICompanyDelete>("ICompanyDelete", CompanyDelete);
    // Registry Module useCases
    container.registerSingleton<IModuleGetAllByCompany>(
      "IModuleGetAllByCompany",
      ModuleGetAllByCompany
    );
    container.registerSingleton<IModuleGetAll>("IModuleGetAll", ModuleGetAll);
    container.registerSingleton<IModuleGetById>("IModuleGetById", ModuleGetById);
    container.registerSingleton<IModuleCreate>("IModuleCreate", ModuleCreate);
    container.registerSingleton<IModuleUpdate>("IModuleUpdate", ModuleUpdate);
    container.registerSingleton<IModuleDelete>("IModuleDelete", ModuleDelete);
    // Registry Role useCases
    container.registerSingleton<IRoleGetAll>("IRoleGetAll", RoleGetAll);
    container.registerSingleton<IRoleGetById>("IRoleGetById", RoleGetById);
    container.registerSingleton<IRoleCreate>("IRoleCreate", RoleCreate);
    container.registerSingleton<IRoleUpdate>("IRoleUpdate", RoleUpdate);
    container.registerSingleton<IRoleDelete>("IRoleDelete", RoleDelete);
    // Registry User useCases
    container.registerSingleton<IUserGetAll>("IUserGetAll", UserGetAll);
    container.registerSingleton<IUserGetById>("IUserGetById", UserGetById);
    container.registerSingleton<IUserCreate>("IUserCreate", UserCreate);
    container.registerSingleton<IUserUpdate>("IUserUpdate", UserUpdate);
    container.registerSingleton<IUserDelete>("IUserDelete", UserDelete);
  }
}

import { MainController } from "@api/controller/MainController";
import { Extensions } from "@application/extension";
import { HasRole } from "@application/usecase/webeditor/HasRole";
import { MakeLogin } from "@application/usecase/webeditor/MakeLogin";
import { CompanyCreate } from "@application/usecase/webeditor/company/CompanyCreate";
import { CompanyDelete } from "@application/usecase/webeditor/company/CompanyDelete";
import { CompanyGetAll } from "@application/usecase/webeditor/company/CompanyGetAll";
import { CompanyGetById } from "@application/usecase/webeditor/company/CompanyGetById";
import { CompanyUpdate } from "@application/usecase/webeditor/company/CompanyUpdate";
import { ModuleCreate } from "@application/usecase/webeditor/module/ModuleCreate";
import { ModuleDelete } from "@application/usecase/webeditor/module/ModuleDelete";
import { ModuleGetAll } from "@application/usecase/webeditor/module/ModuleGetAll";
import { ModuleGetById } from "@application/usecase/webeditor/module/ModuleGetById";
import { ModuleUpdate } from "@application/usecase/webeditor/module/ModuleUpdate";
import { RoleCreate } from "@application/usecase/webeditor/role/RoleCreate";
import { RoleDelete } from "@application/usecase/webeditor/role/RoleDelete";
import { RoleGetAll } from "@application/usecase/webeditor/role/RoleGetAll";
import { RoleGetById } from "@application/usecase/webeditor/role/RoleGetById";
import { RoleUpdate } from "@application/usecase/webeditor/role/RoleUpdate";
import { UserCreate } from "@application/usecase/webeditor/user/UserCreate";
import { UserDelete } from "@application/usecase/webeditor/user/UserDelete";
import { UserGetAll } from "@application/usecase/webeditor/user/UserGetAll";
import { UserGetById } from "@application/usecase/webeditor/user/UserGetById";
import { UserUpdate } from "@application/usecase/webeditor/user/UserUpdate";
import { PgPromiseContext } from "@infra/context/PgPromiseContext";
import { Registry } from "@infra/di/Registry";
import { BCryptHashProvider } from "@infra/provider/BCryptHashProvider";
import { JwtWebTokenProvider } from "@infra/provider/JwtWebTokenProvider";
import { CompanyRepository } from "@infra/repository/webeditor/CompanyRepository";
import { ModuleRepository } from "@infra/repository/webeditor/ModuleRepository";
import { RoleRepository } from "@infra/repository/webeditor/RoleRepository";
import { UserRepository } from "@infra/repository/webeditor/UserRepository";
import cors from "cors";
import express from "express";

Extensions.NoAccents;

const dbContext = new PgPromiseContext();
const userRepository = new UserRepository(dbContext);
const roleRepository = new RoleRepository(dbContext);
const companyRepository = new CompanyRepository(dbContext);
const moduleRepository = new ModuleRepository(dbContext);

const makeLogin = new MakeLogin(userRepository);
const hasRole = new HasRole(userRepository);

const companyGetAll = new CompanyGetAll(companyRepository);
const companyGetById = new CompanyGetById(companyRepository);
const companyCreate = new CompanyCreate(companyRepository);
const companyUpdate = new CompanyUpdate(companyRepository);
const companyDelete = new CompanyDelete(companyRepository);

const moduleGetAll = new ModuleGetAll(moduleRepository);
const moduleGetById = new ModuleGetById(moduleRepository);
const moduleCreate = new ModuleCreate(moduleRepository);
const moduleUpdate = new ModuleUpdate(moduleRepository);
const moduleDelete = new ModuleDelete(moduleRepository);

const roleGetAll = new RoleGetAll(roleRepository);
const roleGetById = new RoleGetById(roleRepository);
const roleCreate = new RoleCreate(roleRepository);
const roleUpdate = new RoleUpdate(roleRepository);
const roleDelete = new RoleDelete(roleRepository);

const userGetAll = new UserGetAll(userRepository);
const userGetById = new UserGetById(userRepository);
const userCreate = new UserCreate(userRepository);
const userUpdate = new UserUpdate(userRepository);
const userDelete = new UserDelete(userRepository);

Registry.getInstance().provide("IMakeLogin", makeLogin);
Registry.getInstance().provide("IHasRole", hasRole);
Registry.getInstance().provide("IHashProvider", new BCryptHashProvider());
Registry.getInstance().provide("ITokenProvider", new JwtWebTokenProvider());

Registry.getInstance().provide("ICompanyGetAll", companyGetAll);
Registry.getInstance().provide("ICompanyGetById", companyGetById);
Registry.getInstance().provide("ICompanyCreate", companyCreate);
Registry.getInstance().provide("ICompanyUpdate", companyUpdate);
Registry.getInstance().provide("ICompanyDelete", companyDelete);

Registry.getInstance().provide("IModuleGetAll", moduleGetAll);
Registry.getInstance().provide("IModuleGetById", moduleGetById);
Registry.getInstance().provide("IModuleCreate", moduleCreate);
Registry.getInstance().provide("IModuleUpdate", moduleUpdate);
Registry.getInstance().provide("IModuleDelete", moduleDelete);

Registry.getInstance().provide("IRoleGetAll", roleGetAll);
Registry.getInstance().provide("IRoleGetById", roleGetById);
Registry.getInstance().provide("IRoleCreate", roleCreate);
Registry.getInstance().provide("IRoleUpdate", roleUpdate);
Registry.getInstance().provide("IRoleDelete", roleDelete);

Registry.getInstance().provide("IUserGetAll", userGetAll);
Registry.getInstance().provide("IUserGetById", userGetById);
Registry.getInstance().provide("IUserCreate", userCreate);
Registry.getInstance().provide("IUserUpdate", userUpdate);
Registry.getInstance().provide("IUserDelete", userDelete);

const app = express();
app.use(cors());
app.use(express.json());

const mainController = new MainController();
app.use(mainController.router);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

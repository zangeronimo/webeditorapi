import { MainController } from "@api/controller/MainController";
import { Extensions } from "@application/extension";
import { HasRole } from "@application/usecase/webeditor/HasRole";
import { MakeLogin } from "@application/usecase/webeditor/MakeLogin";
import { RefreshToken } from "@application/usecase/webeditor/RefreshToken";
import { CompanyCreate } from "@application/usecase/webeditor/company/CompanyCreate";
import { CompanyDelete } from "@application/usecase/webeditor/company/CompanyDelete";
import { CompanyGetAll } from "@application/usecase/webeditor/company/CompanyGetAll";
import { CompanyGetById } from "@application/usecase/webeditor/company/CompanyGetById";
import { CompanyUpdate } from "@application/usecase/webeditor/company/CompanyUpdate";
import { ModuleCreate } from "@application/usecase/webeditor/module/ModuleCreate";
import { ModuleDelete } from "@application/usecase/webeditor/module/ModuleDelete";
import { ModuleGetAll } from "@application/usecase/webeditor/module/ModuleGetAll";
import { ModuleGetAllByCompany } from "@application/usecase/webeditor/module/ModuleGetAllByCompany";
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

const app = express();
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true, //access-control-allow-credentials:true
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

const mainController = new MainController();
app.use(mainController.router);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

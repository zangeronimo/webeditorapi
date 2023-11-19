import { MainController } from "@api/controller/MainController";
import { Extensions } from "@application/extension";
import { MakeLogin } from "@application/usercase/webeditor/MakeLogin";
import { RoleCreate } from "@application/usercase/webeditor/role/RoleCreate";
import { RoleDelete } from "@application/usercase/webeditor/role/RoleDelete";
import { RoleGetAll } from "@application/usercase/webeditor/role/RoleGetAll";
import { RoleGetById } from "@application/usercase/webeditor/role/RoleGetById";
import { RoleUpdate } from "@application/usercase/webeditor/role/RoleUpdate";
import { UserCreate } from "@application/usercase/webeditor/user/UserCreate";
import { UserDelete } from "@application/usercase/webeditor/user/UserDelete";
import { UserGetAll } from "@application/usercase/webeditor/user/UserGetAll";
import { UserGetById } from "@application/usercase/webeditor/user/UserGetById";
import { UserUpdate } from "@application/usercase/webeditor/user/UserUpdate";
import { PgPromiseContext } from "@infra/context/PgPromiseContext";
import { Registry } from "@infra/di/Registry";
import { BCryptHashProvider } from "@infra/provider/BCryptHashProvider";
import { JwtWebTokenProvider } from "@infra/provider/JwtWebTokenProvider";
import { RoleRepository } from "@infra/repository/webeditor/RoleRepository";
import { UserRepository } from "@infra/repository/webeditor/UserRepository";
import cors from "cors";
import express from "express";

Extensions.NoAccents;

const dbContext = new PgPromiseContext();
const userRepository = new UserRepository(dbContext);
const roleRepository = new RoleRepository(dbContext);
const makeLogin = new MakeLogin(userRepository);
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
Registry.getInstance().provide("IHashProvider", new BCryptHashProvider());
Registry.getInstance().provide("ITokenProvider", new JwtWebTokenProvider());

const app = express();
app.use(cors());
app.use(express.json());

const mainController = new MainController();
app.use(mainController.router);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

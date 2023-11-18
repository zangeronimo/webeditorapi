import { MainController } from "@api/controller/MainController";
import { Extensions } from "@application/extension";
import { MakeLogin } from "@application/usercase/MakeLogin";
import { UserDelete } from "@application/usercase/UserDelete";
import { UserGetAll } from "@application/usercase/UserGetAll";
import { UserGetById } from "@application/usercase/UserGetById";
import { PgPromiseContext } from "@infra/context/PgPromiseContext";
import { Registry } from "@infra/di/Registry";
import { BCryptHashProvider } from "@infra/provider/BCryptHashProvider";
import { JwtWebTokenProvider } from "@infra/provider/JwtWebTokenProvider";
import { UserRepository } from "@infra/repository/UserRepository";
import cors from "cors";
import express from "express";

Extensions.NoAccents;

const dbContext = new PgPromiseContext();
const userRepository = new UserRepository(dbContext);
const makeLogin = new MakeLogin(userRepository);
const userGetAll = new UserGetAll(userRepository);
const userGetById = new UserGetById(userRepository);
const userDelete = new UserDelete(userRepository);

Registry.getInstance().provide("IMakeLogin", makeLogin);
Registry.getInstance().provide("IUserGetAll", userGetAll);
Registry.getInstance().provide("IUserGetById", userGetById);
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

import cors from "cors";
import express from "express";

import { MainController } from "@api/controller/MainController";
import { Extensions } from "@application/extension";
import { PgPromiseContext } from "@infra/context";
import { ExtensionDI } from "@infra/extensions";

Extensions.init();
const dbContext = new PgPromiseContext();
ExtensionDI.init(dbContext);

const app = express();
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

const mainController = new MainController();
app.use(mainController.router);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

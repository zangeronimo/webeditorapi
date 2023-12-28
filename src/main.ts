import 'reflect-metadata';
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { MainController } from "@api/controller/MainController";
import { Extensions } from "@application/extension";
import { ExtensionDI } from "@infra/extensions";

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

Extensions.init();
ExtensionDI.init();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use("/files", express.static(path.resolve(__dirname, "..", "upload")));

const mainController = new MainController();
app.use(mainController.router);

const port = process.env.EXPRESS_PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

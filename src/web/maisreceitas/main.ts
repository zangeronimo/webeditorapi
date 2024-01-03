import "reflect-metadata";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { Extensions } from "@application/extension";
import { ExtensionDI } from "@infra/extensions";
import { Controller } from "./Controller";

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

Extensions.init();
ExtensionDI.init();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.locals.basedir = path.join(__dirname, "views");

app.use(express.json({ limit: "1mb" }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "..", "..", "upload"))
);

const mainController = new Controller();
app.use(mainController.router);

app.listen(4001, () => {
  console.log("Server running on port 4001");
});
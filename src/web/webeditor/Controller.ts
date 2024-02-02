import { Router } from "express";
import { Authorize } from "./Authorize";
import { Pug } from "./models/Pug";
import { Routes } from "./routes";
import { SideBar } from "./views/components/sidebar";

export class Controller extends Authorize {
  readonly router = Router();
  readonly pug = new Pug();

  constructor() {
    super();
    Routes.init(this.router, this.baseRender);
  }

  private baseRender = async (query?: string) => {
    const header = () => this.pug.renderFile("components/header", { query });

    const sideBar = new SideBar();
    const sidebar = await sideBar.render();
    return { header, sidebar };
  };
}

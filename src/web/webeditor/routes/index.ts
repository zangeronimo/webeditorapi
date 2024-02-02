import { Router } from "express";
import { DashboardRoutes } from "./institutional/dashboardRoutes";
import { NewslettersRoutes } from "./institutional/newslettersRoutes";
import { SignInRoutes } from "./system/signInRoutes";

export class Routes {
  static init = (router: Router, baseRender: any) => {
    const dashboardRoutes = new DashboardRoutes(baseRender);
    const newsletterRoutes = new NewslettersRoutes(baseRender);
    const signInRoutes = new SignInRoutes(baseRender);

    router.use("/sign-in", signInRoutes.router);
    router.use("/", dashboardRoutes.router);
    router.use("/institutional/newsletters", newsletterRoutes.router);
  };
}

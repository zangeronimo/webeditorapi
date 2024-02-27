import { Router } from "express";
import { RatesRoutes } from "./culinary/ratesRoutes";
import { AccessDeniedRoutes } from "./institutional/accessDeniedRoutes";
import { DashboardRoutes } from "./institutional/dashboardRoutes";
import { NewslettersRoutes } from "./institutional/newslettersRoutes";
import { BannersCategoriesRoutes } from "./publicity/bannersCategoriesRoutes";
import { BannersRoutes } from "./publicity/bannersRoutes";
import { CompanyRoutes } from "./system/companyRoutes";
import { ModuleRoutes } from "./system/moduleRoutes";
import { SidebarRoutes } from "./system/sidebarRoutes";
import { SignInRoutes } from "./system/signInRoutes";
import { UserHasPermissionRoutes } from "./system/userHasPermission";

export class Routes {
  static init = (router: Router, baseRender: any) => {
    const sidebarRoutes = new SidebarRoutes();
    const userHasPermissionRoutes = new UserHasPermissionRoutes();
    const signInRoutes = new SignInRoutes(baseRender);
    const accessDeniedRoutes = new AccessDeniedRoutes(baseRender);
    const companyRoutes = new CompanyRoutes(baseRender);
    const moduleRoutes = new ModuleRoutes(baseRender);
    const dashboardRoutes = new DashboardRoutes(baseRender);
    const newsletterRoutes = new NewslettersRoutes(baseRender);
    const bannersRoutes = new BannersRoutes(baseRender);
    const bannersCategoriesRoutes = new BannersCategoriesRoutes(baseRender);
    const ratesRoutes = new RatesRoutes(baseRender);

    router.use("/sidebar", sidebarRoutes.router);
    router.use("/has-permission", userHasPermissionRoutes.router);
    router.use("/sign-in", signInRoutes.router);
    router.use("/access-denied", accessDeniedRoutes.router);
    router.use("/administrator/companies", companyRoutes.router);
    router.use("/administrator/modules", moduleRoutes.router);
    router.use("/", dashboardRoutes.router);
    router.use("/institutional/newsletters", newsletterRoutes.router);
    router.use("/publicity/categories", bannersCategoriesRoutes.router);
    router.use("/publicity/banners", bannersRoutes.router);
    router.use("/culinary/ratings", ratesRoutes.router);
  };
}

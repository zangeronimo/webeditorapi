import { Router } from "express";
import { NewsletterController } from "./NewsletterController";

export class InstitutionalRouters {
  static init = (router: Router) => {
    const newsletterController = new NewsletterController();

    router.use("/institutional/newsletter", newsletterController.router);
  };
}

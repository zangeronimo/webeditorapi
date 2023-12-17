import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import { Router } from "express";
import { LevelController } from "./LevelController";

export class CulinaryRouters {
  static init = (
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole,
    router: Router
  ) => {
    const levelController = new LevelController(
      ensureAuthenticated,
      ensureHasRole
    );

    router.use("/culinary/level", levelController.router);
  };
}

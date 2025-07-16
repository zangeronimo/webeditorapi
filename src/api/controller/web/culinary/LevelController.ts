import { IEnsureHasInternalSecret } from "@api/midleware/EnsureHasInternalSecret";
import { ILevelDao } from "@application/interface/dao/culinary/ILevelDao";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class LevelController {
  router = Router();
  ensureHasInternalSecret = container.resolve<IEnsureHasInternalSecret>(
    "IEnsureHasInternalSecret"
  );
  levelDao = container.resolve<ILevelDao>("ILevelDao");

  constructor() {
    this.router.get(
      "/",
      this.ensureHasInternalSecret.executeAsync(),
      this.getAllAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { category } = req.query;
      const data = await this.levelDao.getAllAsync(
        category === "true",
        company
      );
      res.status(200).json(data);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };
}

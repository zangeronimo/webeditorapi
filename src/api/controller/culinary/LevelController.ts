import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  ILevelGetAll,
  ILevelGetById,
  ILevelCreate,
  ILevelUpdate,
  ILevelDelete,
} from "@application/interface/usecase/culinary/level";
import {
  LevelCreateDataModel,
  LevelUpdateDataModel,
  GetAllLevelFilterModel,
} from "@application/model/culinary/level";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";

export class LevelController {
  @inject("ILevelGetAll")
  levelGetAll?: ILevelGetAll;
  @inject("ILevelGetById")
  levelGetById?: ILevelGetById;
  @inject("ILevelCreate")
  levelCreate?: ILevelCreate;
  @inject("ILevelUpdate")
  levelUpdate?: ILevelUpdate;
  @inject("ILevelDelete")
  levelDelete?: ILevelDelete;

  router = Router();

  constructor(
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole
  ) {
    this.router.get(
      "/",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_LEVEL_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_LEVEL_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_LEVEL_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_LEVEL_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_LEVEL_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllLevelFilterModel = new GetAllLevelFilterModel(req.query);
      const levels = await this.levelGetAll?.executeAsync(
        getAllLevelFilterModel,
        company
      );
      return res.json(levels);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const level = await this.levelGetById?.executeAsync(id, company);
      return res.json(level);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, active } = req.body;
      const levelCreateDataModel = new LevelCreateDataModel(name, active);
      const level = await this.levelCreate?.executeAsync(
        levelCreateDataModel,
        company
      );
      return res.status(201).json(level);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id, slug, name, active } = req.body;
      const levelUpdateDataModel = new LevelUpdateDataModel(
        id,
        slug,
        name,
        active
      );
      const level = await this.levelUpdate?.executeAsync(
        levelUpdateDataModel,
        company
      );
      return res.json(level);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const level = await this.levelDelete?.executeAsync(id, company);
      return res.json(level);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

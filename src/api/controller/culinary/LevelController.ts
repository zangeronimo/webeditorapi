import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  GetAllLevelFilterModel,
  LevelCreateDataModel,
  LevelUpdateDataModel,
} from "@application/model/culinary/level";
import {
  LevelCreate,
  LevelDelete,
  LevelGetAll,
  LevelGetById,
  LevelUpdate,
} from "@application/usecase/culinary/level";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class LevelController {
  router = Router();
  levelGetAll = container.resolve(LevelGetAll);
  levelGetById = container.resolve(LevelGetById);
  levelCreate = container.resolve(LevelCreate);
  levelUpdate = container.resolve(LevelUpdate);
  levelDelete = container.resolve(LevelDelete);
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  ensureHasRole = container.resolve(EnsureHasRole);

  constructor() {
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_LEVEL_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_LEVEL_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_LEVEL_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_LEVEL_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_LEVEL_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllLevelFilterModel = new GetAllLevelFilterModel(req.query);
      const levels = await this.levelGetAll.executeAsync(
        getAllLevelFilterModel,
        company
      );
      res.json(levels);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const level = await this.levelGetById.executeAsync(id, company);
      res.json(level);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, active } = req.body;
      const levelCreateDataModel = new LevelCreateDataModel(name, active);
      const level = await this.levelCreate.executeAsync(
        levelCreateDataModel,
        company
      );
      res.status(201).json(level);
    } catch (e: any) {
      res.status(400).json(e.message);
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
      const level = await this.levelUpdate.executeAsync(
        levelUpdateDataModel,
        company
      );
      res.json(level);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const level = await this.levelDelete.executeAsync(id, company);
      res.json(level);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };
}

import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  EpicCreateDataModel,
  EpicUpdateDataModel,
  GetAllEpicFilterModel,
} from "@application/model/timesheet/epic";
import { EpicCreate, EpicDelete, EpicGetAll, EpicGetById, EpicUpdate } from "@application/usecase/timesheet/epic";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class EpicController {
  router = Router();
  epicGetAll = container.resolve(EpicGetAll);
  epicGetById = container.resolve(EpicGetById);
  epicCreate = container.resolve(EpicCreate);
  epicUpdate = container.resolve(EpicUpdate);
  epicDelete = container.resolve(EpicDelete);
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  ensureHasRole = container.resolve(EnsureHasRole);

  constructor() {
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_EPIC_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_EPIC_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_EPIC_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_EPIC_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_EPIC_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllEpicFilterModel = new GetAllEpicFilterModel(req.query);
      const epics = await this.epicGetAll.executeAsync(
        getAllEpicFilterModel,
        company
      );
      return res.json(epics);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const epic = await this.epicGetById.executeAsync(id, company);
      return res.json(epic);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, description, status, projectId } = req.body;
      const epicCreateDataModel = new EpicCreateDataModel(
        name,
        description,
        status,
        projectId
      );
      const epic = await this.epicCreate.executeAsync(
        epicCreateDataModel,
        company
      );
      return res.status(201).json(epic);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id, name, description, status, projectId } = req.body;
      const epicUpdateDataModel = new EpicUpdateDataModel(
        id,
        name,
        description,
        status,
        projectId
      );
      const epic = await this.epicUpdate.executeAsync(
        epicUpdateDataModel,
        company
      );
      return res.json(epic);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      await this.epicDelete.executeAsync(id, company);
      return res.status(204).json();
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

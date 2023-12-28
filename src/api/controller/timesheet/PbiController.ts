import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  GetAllPbiFilterModel,
  PbiCreateDataModel,
  PbiUpdateDataModel,
} from "@application/model/timesheet/pbi";
import { PbiCreate, PbiDelete, PbiGetAll, PbiGetById, PbiRegisterWork, PbiUpdate } from "@application/usecase/timesheet/pbi";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class PbiController {
  router = Router();
  pbiGetAll = container.resolve(PbiGetAll);
  pbiGetById = container.resolve(PbiGetById);
  pbiCreate = container.resolve(PbiCreate);
  pbiUpdate = container.resolve(PbiUpdate);
  pbiRegisterWork = container.resolve(PbiRegisterWork);
  pbiDelete = container.resolve(PbiDelete);
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  ensureHasRole = container.resolve(EnsureHasRole);

  constructor() {
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PBI_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PBI_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PBI_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PBI_UPDATE"),
      this.updateAsync
    );
    this.router.patch(
      "/register-work/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PBI_UPDATE"),
      this.registerWorkAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PBI_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { id: userId, company } = req.user;
      const getAllPbiFilterModel = new GetAllPbiFilterModel(req.query);
      const pbis = await this.pbiGetAll.executeAsync(
        getAllPbiFilterModel,
        userId,
        company
      );
      return res.json(pbis);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { id: userId, company } = req.user;
      const { id } = req.params;
      const pbi = await this.pbiGetById.executeAsync(id, userId, company);
      return res.json(pbi);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, description, order, status, epicId, pbiStatusId } =
        req.body;
      const pbiCreateDataModel = new PbiCreateDataModel(
        name,
        description,
        status,
        epicId,
        pbiStatusId,
        order
      );
      const pbi = await this.pbiCreate.executeAsync(
        pbiCreateDataModel,
        company
      );
      return res.status(201).json(pbi);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { id: userId, company } = req.user;
      const { id, name, description, order, status, epicId, pbiStatusId } =
        req.body;
      const pbiUpdateDataModel = new PbiUpdateDataModel(
        id,
        name,
        description,
        status,
        epicId,
        pbiStatusId,
        order
      );
      const pbi = await this.pbiUpdate.executeAsync(
        pbiUpdateDataModel,
        userId,
        company
      );
      return res.json(pbi);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private registerWorkAsync = async (req: Request, res: Response) => {
    try {
      const { id: userId, company } = req.user;
      const { id } = req.params;
      await this.pbiRegisterWork.executeAsync(id, userId, company);
      return res.status(204).json();
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      await this.pbiDelete.executeAsync(id, company);
      return res.status(204).json();
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

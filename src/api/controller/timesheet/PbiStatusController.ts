import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  GetAllPbiStatusFilterModel,
  PbiStatusCreateDataModel,
  PbiStatusUpdateDataModel,
} from "@application/model/timesheet/pbiStatus";
import { PbiStatusCreate, PbiStatusDelete, PbiStatusGetAll, PbiStatusGetById, PbiStatusUpdate } from "@application/usecase/timesheet/pbiStatus";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class PbiStatusController {
  router = Router();
  pbiStatusGetAll = container.resolve(PbiStatusGetAll);
  pbiStatusGetById = container.resolve(PbiStatusGetById);
  pbiStatusCreate = container.resolve(PbiStatusCreate);
  pbiStatusUpdate = container.resolve(PbiStatusUpdate);
  pbiStatusDelete = container.resolve(PbiStatusDelete);
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  ensureHasRole = container.resolve(EnsureHasRole);

  constructor() {
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PBISTATUS_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PBISTATUS_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PBISTATUS_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PBISTATUS_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PBISTATUS_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllPbiStatusFilterModel = new GetAllPbiStatusFilterModel(
        req.query
      );
      const pbiStatuss = await this.pbiStatusGetAll.executeAsync(
        getAllPbiStatusFilterModel,
        company
      );
      return res.json(pbiStatuss);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const pbiStatus = await this.pbiStatusGetById.executeAsync(id, company);
      return res.json(pbiStatus);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, order, status } = req.body;
      const pbiStatusCreateDataModel = new PbiStatusCreateDataModel(
        name,
        order,
        status
      );
      const pbiStatus = await this.pbiStatusCreate.executeAsync(
        pbiStatusCreateDataModel,
        company
      );
      return res.status(201).json(pbiStatus);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id, name, order, status } = req.body;
      const pbiStatusUpdateDataModel = new PbiStatusUpdateDataModel(
        id,
        name,
        order,
        status
      );
      const pbiStatus = await this.pbiStatusUpdate.executeAsync(
        pbiStatusUpdateDataModel,
        company
      );
      return res.json(pbiStatus);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      await this.pbiStatusDelete.executeAsync(id, company);
      return res.status(204).json();
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

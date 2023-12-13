import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  IPbiGetAll,
  IPbiGetById,
  IPbiCreate,
  IPbiUpdate,
  IPbiDelete,
} from "@application/interface/usecase/timesheet/pbi";
import {
  PbiCreateDataModel,
  PbiUpdateDataModel,
  GetAllPbiFilterModel,
} from "@application/model/timesheet/pbi";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";

export class PbiController {
  @inject("IPbiGetAll")
  pbiGetAll?: IPbiGetAll;
  @inject("IPbiGetById")
  pbiGetById?: IPbiGetById;
  @inject("IPbiCreate")
  pbiCreate?: IPbiCreate;
  @inject("IPbiUpdate")
  pbiUpdate?: IPbiUpdate;
  @inject("IPbiDelete")
  pbiDelete?: IPbiDelete;

  router = Router();

  constructor(
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole
  ) {
    this.router.get(
      "/",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_PBI_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_PBI_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_PBI_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_PBI_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_PBI_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllPbiFilterModel = new GetAllPbiFilterModel(req.query);
      const pbis = await this.pbiGetAll?.executeAsync(
        getAllPbiFilterModel,
        company
      );
      return res.json(pbis);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const pbi = await this.pbiGetById?.executeAsync(id, company);
      return res.json(pbi);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, description, status, epicId } = req.body;
      const pbiCreateDataModel = new PbiCreateDataModel(
        name,
        description,
        status,
        epicId
      );
      const pbi = await this.pbiCreate?.executeAsync(
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
      const { company } = req.user;
      const { id, name, description, status, epicId } = req.body;
      const pbiUpdateDataModel = new PbiUpdateDataModel(
        id,
        name,
        description,
        status,
        epicId
      );
      const pbi = await this.pbiUpdate?.executeAsync(
        pbiUpdateDataModel,
        company
      );
      return res.json(pbi);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      await this.pbiDelete?.executeAsync(id, company);
      return res.status(204).json();
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

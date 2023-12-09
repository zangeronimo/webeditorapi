import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  IClientGetAll,
  IClientGetById,
  IClientCreate,
  IClientUpdate,
  IClientDelete,
} from "@application/interface/usecase/timesheet/client";
import {
  ClientCreateDataModel,
  ClientUpdateDataModel,
  GetAllClientFilterModel,
} from "@application/model/timesheet/client";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";

export class ClientController {
  @inject("IClientGetAll")
  clientGetAll?: IClientGetAll;
  @inject("IClientGetById")
  clientGetById?: IClientGetById;
  @inject("IClientCreate")
  clientCreate?: IClientCreate;
  @inject("IClientUpdate")
  clientUpdate?: IClientUpdate;
  @inject("IClientDelete")
  clientDelete?: IClientDelete;

  router = Router();

  constructor(
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole
  ) {
    this.router.get(
      "/",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_CLIENT_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_CLIENT_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_CLIENT_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_CLIENT_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_CLIENT_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllClientFilterModel = new GetAllClientFilterModel(req.query);
      const clients = await this.clientGetAll?.executeAsync(
        getAllClientFilterModel,
        company
      );
      return res.json(clients);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const client = await this.clientGetById?.executeAsync(id, company);
      return res.json(client);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, status } = req.body;
      const clientCreateDataModel = new ClientCreateDataModel(name, status);
      const client = await this.clientCreate?.executeAsync(
        clientCreateDataModel,
        company
      );
      return res.status(201).json(client);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id, name, status } = req.body;
      const clientUpdateDataModel = new ClientUpdateDataModel(id, name, status);
      const client = await this.clientUpdate?.executeAsync(
        clientUpdateDataModel,
        company
      );
      return res.json(client);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const client = await this.clientDelete?.executeAsync(id, company);
      return res.json(client);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

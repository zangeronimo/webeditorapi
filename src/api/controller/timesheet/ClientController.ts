import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  ClientCreateDataModel,
  ClientUpdateDataModel,
  GetAllClientFilterModel,
} from "@application/model/timesheet/client";
import { ClientCreate, ClientDelete, ClientGetAll, ClientGetById, ClientUpdate } from "@application/usecase/timesheet/client";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class ClientController {
  router = Router();
  clientGetAll = container.resolve(ClientGetAll);
  clientGetById = container.resolve(ClientGetById);
  clientCreate = container.resolve(ClientCreate);
  clientUpdate = container.resolve(ClientUpdate);
  clientDelete = container.resolve(ClientDelete);
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  ensureHasRole = container.resolve(EnsureHasRole);

  constructor() {
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_CLIENT_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_CLIENT_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_CLIENT_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_CLIENT_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_CLIENT_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllClientFilterModel = new GetAllClientFilterModel(req.query);
      const clients = await this.clientGetAll.executeAsync(
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
      const client = await this.clientGetById.executeAsync(id, company);
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
      const client = await this.clientCreate.executeAsync(
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
      const client = await this.clientUpdate.executeAsync(
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
      const client = await this.clientDelete.executeAsync(id, company);
      return res.json(client);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

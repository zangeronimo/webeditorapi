import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  GetAllRoleFilterModel,
  RoleCreateDataModel,
  RoleUpdateDataModel,
} from "@application/model/webeditor/role";
import { RoleGetAll, RoleGetById, RoleCreate, RoleUpdate, RoleDelete } from "@application/usecase/webeditor/role";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class RoleController {
  router = Router();
  roleGetAll = container.resolve(RoleGetAll);
  roleGetById = container.resolve(RoleGetById);
  roleCreate = container.resolve(RoleCreate);
  roleUpdate = container.resolve(RoleUpdate);
  roleDelete = container.resolve(RoleDelete);
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  ensureHasRole = container.resolve(EnsureHasRole);

  constructor() {
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_ROLE_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_ROLE_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_ROLE_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_ROLE_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_ROLE_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const getAllRoleFilterModel = new GetAllRoleFilterModel(req.query);
      const roles = await this.roleGetAll.executeAsync(getAllRoleFilterModel);
      return res.json(roles);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const role = await this.roleGetById.executeAsync(id);
      return res.json(role);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { name, label, order, moduleId } = req.body;
      const roleCreateDataModel = new RoleCreateDataModel(
        name,
        label,
        order,
        moduleId
      );
      const role = await this.roleCreate.executeAsync(roleCreateDataModel);
      return res.status(201).json(role);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { id, name, label, order, moduleId } = req.body;
      const roleUpdateDataModel = new RoleUpdateDataModel(
        id,
        name,
        label,
        order,
        moduleId
      );
      const role = await this.roleUpdate.executeAsync(roleUpdateDataModel);
      return res.json(role);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const role = await this.roleDelete.executeAsync(id);
      return res.json(role);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

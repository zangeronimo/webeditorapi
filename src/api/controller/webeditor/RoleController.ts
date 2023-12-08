import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  IRoleCreate,
  IRoleDelete,
  IRoleGetAll,
  IRoleGetById,
  IRoleUpdate,
} from "@application/interface/usecase/webeditor/role";
import {
  GetAllRoleFilterModel,
  RoleCreateDataModel,
  RoleUpdateDataModel,
} from "@application/model/webeditor/role";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";

export class RoleController {
  @inject("IRoleGetAll")
  roleGetAll?: IRoleGetAll;
  @inject("IRoleGetById")
  roleGetById?: IRoleGetById;
  @inject("IRoleCreate")
  roleCreate?: IRoleCreate;
  @inject("IRoleUpdate")
  roleUpdate?: IRoleUpdate;
  @inject("IRoleDelete")
  roleDelete?: IRoleDelete;

  router = Router();

  constructor(
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole
  ) {
    this.router.get(
      "/",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_ROLE_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_ROLE_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_ROLE_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_ROLE_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_ROLE_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const getAllRoleFilterModel = new GetAllRoleFilterModel(req.query);
      const roles = await this.roleGetAll?.executeAsync(getAllRoleFilterModel);
      return res.json(roles);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const role = await this.roleGetById?.executeAsync(id);
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
      const role = await this.roleCreate?.executeAsync(roleCreateDataModel);
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
      const role = await this.roleUpdate?.executeAsync(roleUpdateDataModel);
      return res.json(role);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const role = await this.roleDelete?.executeAsync(id);
      return res.json(role);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

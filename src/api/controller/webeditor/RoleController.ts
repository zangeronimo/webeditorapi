import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  IRoleCreate,
  IRoleDelete,
  IRoleGetAll,
  IRoleGetById,
  IRoleUpdate,
} from "@application/interface/usecase/webeditor/role";
import { GetAllRoleFilterModel } from "@application/model/webeditor/role/GetAllRoleFilterModel";
import { RoleCreateDataModel } from "@application/model/webeditor/role/RoleCreateModel";
import { RoleUpdateDataModel } from "@application/model/webeditor/role/RoleUpdateModel";
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
      ensureHasRole.execute("WEBEDITOR_ROLE_VIEW"),
      this.getAll
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.execute("WEBEDITOR_ROLE_VIEW"),
      this.getById
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.execute("WEBEDITOR_ROLE_UPDATE"),
      this.create
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.execute("WEBEDITOR_ROLE_UPDATE"),
      this.update
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.execute("WEBEDITOR_ROLE_DELETE"),
      this.delete
    );
  }

  private getAll = async (req: Request, res: Response) => {
    try {
      const getAllRoleFilterModel = new GetAllRoleFilterModel(req.query);
      const roles = await this.roleGetAll?.executeAsync(getAllRoleFilterModel);
      return res.json(roles);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const role = await this.roleGetById?.executeAsync(id);
      return res.json(role);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private create = async (req: Request, res: Response) => {
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

  private update = async (req: Request, res: Response) => {
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

  private delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const role = await this.roleDelete?.executeAsync(id);
      return res.json(role);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

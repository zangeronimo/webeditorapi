import { EnsureAuthenticated } from "@api/midleware/EnsureAuthenticated";
import { EnsureHasRole } from "@api/midleware/EnsureHasRole";
import { IRoleCreate } from "@application/interface/usercase/webeditor/role/IRoleCreate";
import { IRoleDelete } from "@application/interface/usercase/webeditor/role/IRoleDelete";
import { IRoleGetAll } from "@application/interface/usercase/webeditor/role/IRoleGetAll";
import { IRoleGetById } from "@application/interface/usercase/webeditor/role/IRoleGetById";
import { IRoleUpdate } from "@application/interface/usercase/webeditor/role/IRoleUpdate";
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
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_ROLE_VIEW"),
      this.GetAll
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_ROLE_VIEW"),
      this.GetById
    );
    this.router.post(
      "",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_ROLE_UPDATE"),
      this.Create
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_ROLE_UPDATE"),
      this.Update
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_ROLE_DELETE"),
      this.Delete
    );
  }

  GetAll = async (req: Request, res: Response) => {
    try {
      const getAllRoleFilterModel = new GetAllRoleFilterModel(req.query);
      const roles = await this.roleGetAll?.ExecuteAsync(getAllRoleFilterModel);
      return res.json(roles);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  GetById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const role = await this.roleGetById?.ExecuteAsync(id);
      return res.json(role);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  Create = async (req: Request, res: Response) => {
    try {
      const { name, label, order, moduleId } = req.body;
      const roleCreateDataModel = new RoleCreateDataModel(
        name,
        label,
        order,
        moduleId
      );
      const role = await this.roleCreate?.ExecuteAsync(roleCreateDataModel);
      return res.status(201).json(role);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  Update = async (req: Request, res: Response) => {
    try {
      const { id, name, label, order, moduleId } = req.body;
      const roleUpdateDataModel = new RoleUpdateDataModel(
        id,
        name,
        label,
        order,
        moduleId
      );
      const role = await this.roleUpdate?.ExecuteAsync(roleUpdateDataModel);
      return res.json(role);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  Delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const role = await this.roleDelete?.ExecuteAsync(id);
      return res.json(role);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

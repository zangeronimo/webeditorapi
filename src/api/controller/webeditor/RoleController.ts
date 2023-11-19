import { IRoleCreate } from "@application/interface/usercase/webeditor/role/IRoleCreate";
import { IRoleDelete } from "@application/interface/usercase/webeditor/role/IRoleDelete";
import { IRoleGetAll } from "@application/interface/usercase/webeditor/role/IRoleGetAll";
import { IRoleGetById } from "@application/interface/usercase/webeditor/role/IRoleGetById";
import { IRoleUpdate } from "@application/interface/usercase/webeditor/role/IRoleUpdate";
import { GetAllRoleFilterModel } from "@application/model/webeditor/role/GetAllRoleFilterModel";
import { RoleCreateDataModel } from "@application/model/webeditor/role/RoleCreateModel";
import { RoleUpdateDataModel } from "@application/model/webeditor/role/RoleUpdateModel";
import { inject } from "@infra/di/Inject";
import { Request, Response } from "express";

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

  constructor() {}

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

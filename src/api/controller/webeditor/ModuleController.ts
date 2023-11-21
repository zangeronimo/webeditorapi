import { EnsureAuthenticated } from "@api/midleware/EnsureAuthenticated";
import { IModuleCreate } from "@application/interface/usecase/webeditor/module/IModuleCreate";
import { IModuleDelete } from "@application/interface/usecase/webeditor/module/IModuleDelete";
import { IModuleGetAll } from "@application/interface/usecase/webeditor/module/IModuleGetAll";
import { IModuleGetById } from "@application/interface/usecase/webeditor/module/IModuleGetById";
import { IModuleUpdate } from "@application/interface/usecase/webeditor/module/IModuleUpdate";
import { GetAllModuleFilterModel } from "@application/model/webeditor/module/GetAllModuleFilterModel";
import { ModuleCreateDataModel } from "@application/model/webeditor/module/ModuleCreateModel";
import { ModuleUpdateDataModel } from "@application/model/webeditor/module/ModuleUpdateModel";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";
import { EnsureHasRole } from "@api/midleware/EnsureHasRole";

export class ModuleController {
  @inject("IModuleGetAll")
  moduleGetAll?: IModuleGetAll;
  @inject("IModuleGetById")
  moduleGetById?: IModuleGetById;
  @inject("IModuleCreate")
  moduleCreate?: IModuleCreate;
  @inject("IModuleUpdate")
  moduleUpdate?: IModuleUpdate;
  @inject("IModuleDelete")
  moduleDelete?: IModuleDelete;

  router = Router();

  constructor(
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole
  ) {
    this.router.get(
      "/",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_MODULE_VIEW"),
      this.GetAll
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_MODULE_VIEW"),
      this.GetById
    );
    this.router.post(
      "",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_MODULE_UPDATE"),
      this.Create
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_MODULE_UPDATE"),
      this.Update
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_MODULE_DELETE"),
      this.Delete
    );
  }

  GetAll = async (req: Request, res: Response) => {
    try {
      const getAllModuleFilterModel = new GetAllModuleFilterModel(req.query);
      const companies = await this.moduleGetAll?.ExecuteAsync(
        getAllModuleFilterModel
      );
      return res.json(companies);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  GetById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const module = await this.moduleGetById?.ExecuteAsync(id);
      return res.json(module);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  Create = async (req: Request, res: Response) => {
    try {
      const { name, label, order, moduleId } = req.body;
      const moduleCreateDataModel = new ModuleCreateDataModel(name);
      const module = await this.moduleCreate?.ExecuteAsync(
        moduleCreateDataModel
      );
      return res.status(201).json(module);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  Update = async (req: Request, res: Response) => {
    try {
      const { id, name, label, order, moduleId } = req.body;
      const moduleUpdateDataModel = new ModuleUpdateDataModel(id, name);
      const module = await this.moduleUpdate?.ExecuteAsync(
        moduleUpdateDataModel
      );
      return res.json(module);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  Delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const module = await this.moduleDelete?.ExecuteAsync(id);
      return res.json(module);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

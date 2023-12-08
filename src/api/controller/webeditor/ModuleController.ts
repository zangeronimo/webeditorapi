import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  IModuleCreate,
  IModuleDelete,
  IModuleGetAll,
  IModuleGetAllByCompany,
  IModuleGetById,
  IModuleUpdate,
} from "@application/interface/usecase/webeditor/module";
import {
  GetAllModuleFilterModel,
  ModuleCreateDataModel,
  ModuleUpdateDataModel,
} from "@application/model/webeditor/module";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";

export class ModuleController {
  @inject("IModuleGetAllByCompany")
  moduleGetAllByCompany?: IModuleGetAllByCompany;
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
      "/get-all-by-company",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_MODULE_VIEW"),
      this.getAllByCompanyAsync
    );
    this.router.get(
      "/",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_MODULE_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_MODULE_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_MODULE_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_MODULE_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_MODULE_DELETE"),
      this.deleteAsync
    );
  }

  private getAllByCompanyAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const modules = await this.moduleGetAllByCompany?.executeAsync(company);
      return res.json(modules);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const getAllModuleFilterModel = new GetAllModuleFilterModel(req.query);
      const modules = await this.moduleGetAll?.executeAsync(
        getAllModuleFilterModel
      );
      return res.json(modules);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const module = await this.moduleGetById?.executeAsync(id);
      return res.json(module);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { name, label, order, moduleId } = req.body;
      const moduleCreateDataModel = new ModuleCreateDataModel(name);
      const module = await this.moduleCreate?.executeAsync(
        moduleCreateDataModel
      );
      return res.status(201).json(module);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { id, name, label, order, moduleId } = req.body;
      const moduleUpdateDataModel = new ModuleUpdateDataModel(id, name);
      const module = await this.moduleUpdate?.executeAsync(
        moduleUpdateDataModel
      );
      return res.json(module);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const module = await this.moduleDelete?.executeAsync(id);
      return res.json(module);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

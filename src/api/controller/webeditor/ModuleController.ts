import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  GetAllModuleFilterModel,
  ModuleCreateDataModel,
  ModuleUpdateDataModel,
} from "@application/model/webeditor/module";
import { ModuleGetAllByCompany, ModuleGetAll, ModuleGetById, ModuleCreate, ModuleUpdate, ModuleDelete } from "@application/usecase/webeditor/module";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class ModuleController {
  router = Router();
  moduleGetAllByCompany = container.resolve(ModuleGetAllByCompany);
  moduleGetAll = container.resolve(ModuleGetAll);
  moduleGetById = container.resolve(ModuleGetById);
  moduleCreate = container.resolve(ModuleCreate);
  moduleUpdate = container.resolve(ModuleUpdate);
  moduleDelete = container.resolve(ModuleDelete);
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  ensureHasRole = container.resolve(EnsureHasRole);

  constructor( ) {
    this.router.get(
      "/get-all-by-company",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_MODULE_VIEW"),
      this.getAllByCompanyAsync
    );
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_MODULE_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_MODULE_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_MODULE_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_MODULE_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_MODULE_DELETE"),
      this.deleteAsync
    );
  }

  private getAllByCompanyAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const modules = await this.moduleGetAllByCompany.executeAsync(company);
      return res.json(modules);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const getAllModuleFilterModel = new GetAllModuleFilterModel(req.query);
      const modules = await this.moduleGetAll.executeAsync(
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
      const module = await this.moduleGetById.executeAsync(id);
      return res.json(module);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { name, label, order, moduleId } = req.body;
      const moduleCreateDataModel = new ModuleCreateDataModel(name);
      const module = await this.moduleCreate.executeAsync(
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
      const module = await this.moduleUpdate.executeAsync(
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
      const module = await this.moduleDelete.executeAsync(id);
      return res.json(module);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}
